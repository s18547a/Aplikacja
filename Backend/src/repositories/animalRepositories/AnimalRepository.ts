

import { executionAsyncResource } from "async_hooks";
import Animal,{Sex} from "../../classes/Animal";


import { AnimalParametersType, IllnessCuredParameters } from "../../classes/Interfaces";
import { createIDwithUUIDV4 } from "../../helpers/idHelpers";
const config = require("../../db/userConnection");
const sql = require("mssql");

const AnimalTypeRepository=require('./AnimalTypeRepository');
const AnimalMedicalInfoRepository=require('./AnimalMedicalInfoRepository');

exports.getAnimal=async(AnimalId:string)=>{

  try {

    let pool =await sql.connect(config);
    let result = await pool.request().input("AnimalId",sql.VarChar,AnimalId).query("Select * From Animal where AnimalId=@AnimalId")


    const animalRecord=result.recordset[0];

    if(animalRecord==undefined){

      return null
    }

  
    const AnimalType = await  AnimalTypeRepository.getAnimalTypes({
      AnimalTypeId: animalRecord.AnimalTypeId,
    });
    
    
    const newAnimal = new Animal(
      AnimalId,
      animalRecord.Name,
      animalRecord.BirthDate.toISOString().split("T")[0],
      animalRecord.Weight,

      animalRecord.OwnerId,
      animalRecord.ProfileImage,
      animalRecord.Sex,
      animalRecord.AnimalTypeId,

      AnimalType
    );

    return newAnimal;

    
  } catch (error) {
    console.log(error)
    return error
    
  }
}



exports.getAnimals = async (parameters: AnimalParametersType) => {
  try {
    
    
    let pool = await sql.connect(config);
    let animalsRecordset;

    if ( !parameters.OwnerId && !parameters.Email) {
      const result = await pool.request().query("Select * From Animal");
      animalsRecordset = result.recordset;
    } else if (parameters.OwnerId) {
      const result = await pool
        .request()
        .input("OwnerId", sql.VarChar, parameters.OwnerId)
        .query("Select * From Animal Where OwnerId=@OwnerId");
      animalsRecordset = result.recordset;
    } else  if (parameters.Email) {
      const result= await pool
        .request()
        .query(
          `Select AnimalId,Name,BirthDate,Weight,u.OwnerId,Sex,AnimalTypeId From Animal a join [User] u on a.OwnerId=u.OwnerId   where u.Email like '${parameters.Email}%'`
        );
      animalsRecordset = result.recordset;
    }

    let isEmpty: boolean;
    animalsRecordset[0] == undefined || animalsRecordset[0] === null
      ? (isEmpty = true)
      : (isEmpty = false);

    if (isEmpty) {
      return null;
    } else {
      const animals: Animal[] = await Promise.all(
        animalsRecordset.map(async (animal) => {
          const AnimalType = await  AnimalTypeRepository.getAnimalTypes({
            AnimalTypeId: animal.AnimalTypeId,
          });
            
          const newAnimal = new Animal(
            animal.AnimalId,
            animal.Name,
            animal.BirthDate.toISOString().split("T")[0],
            animal.Weight,

            animal.OwnerId,
            animal.ProfileImage,
            animal.Sex,
            animal.AnimalTypeId,

            AnimalType
          );

          return newAnimal;
        })
      );

       return animals;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.registerAnimal = async (newAnimal) => {
  console.log(newAnimal);

  try {
    let pool = await sql.connect(config);
    let rowsAffected;
    let transaction = new sql.Transaction(pool);

    try {
      const AnimalId: string = createIDwithUUIDV4();
      const Name: string = newAnimal.Name;
      const BirthDate: string = newAnimal.BirthDate;
      const Weight: number = newAnimal.Weight;
      const AnimalTypeId: string = newAnimal.AnimalTypeId;
      const OwnerId: string = newAnimal.OwnerId;
      const Sex: Sex = newAnimal.Sex;

      const ProfileImage: string = newAnimal.ProfileImage;

   
      await transaction.begin();
      let results = await new sql.Request(transaction)
        .input("AnimalId", sql.VarChar, AnimalId)
        .input("Name", sql.VarChar, Name)
        .input("BirthDate", sql.Date, BirthDate)
        .input("Weight", sql.Decimal, Weight)
        .input("AnimalTypeId", sql.VarChar, AnimalTypeId)
        .input("OwnerId", sql.VarChar, OwnerId)
        .input("Sex", sql.TinyInt, Sex)

        .input("ProfileImage", sql.VarChar, ProfileImage)
        .query(
          "Insert into Animal(AnimalId,Name,BirthDate,Weight,AnimalTypeId,OwnerId,ProfileImage,Sex) values(@AnimalId,@Name,@BirthDate,@Weight,@AnimalTypeId,@OwnerId,@ProfileImage,@Sex)"
        );
      rowsAffected = results.rowsAffected[0];
      console.log(rowsAffected);

      if (rowsAffected != 1) {
        throw Error("");
      } else {
          const createAnimalMedicalInformationResult = await AnimalMedicalInfoRepository.createAnimalMedicalInformation(AnimalId,transaction);

        if (AnimalId != createAnimalMedicalInformationResult) {
         
          throw Error("");
        } else {
          
          await transaction.commit()
          
          return AnimalId;
        }
      }
    } catch (error) {
      await transaction.rollback();
     
      throw Error("");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.updateAnimal = async (Animal: Animal)=> {
  const AnimalId: string | null = Animal.AnimalId;
  const Name: string = Animal.Name;
  const BirthDate: string = Animal.BirthDate;

  const AnimalTypeId: number = Animal.AnimalTypeId;
  const OwnerId: string = Animal.OwnerId;
  const Sex: number = Animal.Sex;

  const ProfileImage: string | null = Animal.ProfileImage;

  try {
    console.log(Animal.Weight);
    let pool = await sql.connect(config);
    let animalRegisterPool = await pool
      .request()
      .input("Name", sql.VarChar, Name)
      .input("BirthDate", sql.Date, BirthDate)
      .input("Weight", sql.Decimal, Animal.Weight)
      .input("AnimalTypeId", sql.VarChar, AnimalTypeId)
      .input("OwnerId", sql.VarChar, OwnerId)
      .input("Sex", sql.TinyInt, Sex)

      .input("AnimalId", sql.VarChar, AnimalId)
      .input("ProfileImage", sql.VarChar, ProfileImage)

      .query(
        "Update Animal set Name=@Name, BirthDate = @BirthDate, Weight=@Weight,Sex=@Sex, ProfileImage=@ProfileImage where AnimalId=@AnimalId"
      );
    console.log(animalRegisterPool);
   
    return AnimalId;
  } catch (error) {
    console.log(error);
    return error;
  }
};







