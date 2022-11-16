var config = require("../../db/UserConnection");

const dateHelper=require('../../helpers/dateHelper');
import Vet from "../../classes/Vet";

import { createIDwithUUIDV4 } from "../../helpers/idHelpers";
import { GetVetParameters } from "../../classes/Interfaces";

const SharedRepository = require("./../SharedRepository");
const VetScheduldeRepository=require('./VetScheduldeRepository');
const VetTypeRepository=require('./VetTypeRepository');
const sql = require("mssql");



exports.getVet=async(VetId:string)=>{

  try {
    let pool = await sql.connect(config);
    const results = await pool
    .request()
    .input("VetId", sql.VarChar, VetId)
    .query(
      `Select v.VetId, Name,LastName, Contact,HireDate, u.Email, ProfileImage From Vet v join [User] u on v.VetId=u.VetId where v.VetId=@VetId`
    );
      const vetRecord=results.recordset[0];

      if(vetRecord==undefined){
        return null
      }

    let vetTypes= await VetTypeRepository.getVetTypes({ VetId: VetId});

      if (vetTypes === null) {
        vetTypes = [];
      }

      const vet=  new Vet(
        vetRecord.VetId,
        vetRecord.Name,
        vetRecord.LastName,
        vetRecord.Contact,
        vetRecord.Email,
        vetRecord.HireDate.toISOString().split("T")[0],
        vetRecord.ProfileImage,
        vetTypes
      );
    return vet

  } catch (error) {
    console.log(error)

    return error
    
  }

}

exports.getVets = async (parameters: GetVetParameters) => {
  try {
  
    let vetsRecordset: any[] = [];
    let pool = await sql.connect(config);

    if (parameters.Date) {
      const newDate = dateHelper.getDayOfAWeekName(parameters.Date);

      const vetPool = await pool
        .request()
        .query(
          `Select v.VetId, Name,LastName, Contact,HireDate, ProfileImage From Vet v join Schedulde s on v.VetId=s.VetId where ${newDate} is not null`
        );
      vetsRecordset = vetPool.recordset;
    }  else if (parameters.VetType) {
      const vetPool = await pool
        .request()
        .input("VetType", sql.VarChar, parameters.VetType)
        .query(
          `Select v.VetId,v.Name,v.LastName, v.Contact,v.HireDate, v.ProfileImage From Vet v join VetTypeVet vtv on v.VetId=vtv.VetId join SurgeryType st on vtv.VetType=st.VetType where st.SurgeryType=@VetType`
        );
      vetsRecordset = vetPool.recordset;
    } else if (!parameters.VetType &&  !parameters.Date) {
      const vetPool = await pool
        .request()

        .query("Select * From Vet ");
      vetsRecordset = vetPool.recordset;
    }

    let isEmpty: boolean;

    vetsRecordset[0] == undefined ? (isEmpty = true) : (isEmpty = false);
    if (isEmpty) {
      return null;
    } else {
      let vets = await Promise.all(
        vetsRecordset.map(async (vet) => {
          let vetTypes: { VetType: string; Salary: number }[] =
            await VetTypeRepository.getVetTypes({ VetId: vet.VetId });

          if (vetTypes === null) {
            vetTypes = [];
          }

          return new Vet(
            vet.VetId,
            vet.Name,
            vet.LastName,
            vet.Contact,
            vet.Email,
            vet.HireDate.toISOString().split("T")[0],
            vet.ProfileImage,
            vetTypes
          );
        })
      );

      
        // pool.close()
        return vets;
      
    }
  } catch (error) {
    console.log(error);

    return error;
  }
};

exports.registerVet = async (vet) => {
  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);

    try {
      const VetId: string = createIDwithUUIDV4();
      const Email: string = vet.Email;
      const Password: string | null = vet.Password;
      const Name: string = vet.Name;
      const LastName: string = vet.LastName;
      const Contact: string = vet.Contact;
      const HireDate: string = vet.HireDate;
      const ProfileImage: String | null = vet.ProfileImage;
      const VetType: string[] = vet.VetType;

      //  let hashedPassword = authUtils.hashPassword(Password);
      let hashedPassword = Password;

      const emailExists = await SharedRepository.emailExists(Email);
      console.log(emailExists);
      if (emailExists) {
        return null;
      }

      //    let registerOwnerPool=await pool.request()
      let rowsAffected;

      await transaction.begin();
      let results = await new sql.Request(transaction)
        .input("VetId", sql.VarChar, VetId)
        .input("Email", sql.VarChar, Email)
        .input("Password", sql.VarChar, hashedPassword)
        .input("Name", sql.VarChar, Name)
        .input("LastName", sql.VarChar, LastName)
        .input("Contact", sql.VarChar, Contact)
        .input("HireDate", sql.VarChar, HireDate)
        .input("ProfileImage", sql.VarChar, ProfileImage)
        .query(
          "EXEC CreateVet @VetId=@VetId ,@Email=@Email,@Password=@Password,@Name=@Name,@LastName=@LastName,@Contact=@Contact,@HireDate=@HireDate ,@ProfileImage=@ProfileImage"
        );

      rowsAffected = results.rowsAffected[0];

      console.log(results);

      if (rowsAffected != 1) {
        throw Error("");
      }

      if (VetType.length > 0) {
        for await (let value of VetType) {
          let vetTypeResult = await new sql.Request(transaction)
            .input("VetId", sql.VarChar, VetId)
            .input("VetType", sql.VarChar, value)
            .query(
              "Insert Into VetTypeVet(VetId,VetType) values(@VetId,@VetType)"
            );

          if (vetTypeResult.rowsAffected[0] != 1) {
            throw Error("");
          }
        }
      }

      const createScheduldeResults = await VetScheduldeRepository.createSchedulde(
        VetId,
        transaction
      );
      if (createScheduldeResults != VetId) {
        throw Error("");
      }

      console.log("CREATED");
     await transaction.commit();
      pool.close();
      return VetId;
    } catch (error) {
      console.log(error);
     await transaction.rollback();
      pool.close();
      throw Error("");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};






