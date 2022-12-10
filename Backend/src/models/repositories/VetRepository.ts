const config = require('../../config/mssql/userConnection.js');

import Vet from '../classes/Vet';

import { createIDwithUUIDV4 } from '../../utils/idHelpers';
import { GetVetParameters } from '../classes/Interfaces';
import { validateContact } from '../../utils/validator';
import { hashPassword } from '../../utils/auth/authUtils';
import { getDayOfAWeekName } from '../../utils/dateHelper';
import VetTypeRepository from './VetTypeRepository';
import VetScheduldeRepository from './VetScheduldeRepository';

const SharedRepository = require('./SharedRepository');
//const VetTypeRepository=require('./VetTypeRepository');
const sql = require('mssql');

class VetRepository{

   
    vetTypeRepository;
    vetScheduldeRepository;
    constructor(vetTypeRepository:VetTypeRepository,vetScheduldeRepository:VetScheduldeRepository){
        this.vetTypeRepository=vetTypeRepository;
        this.vetScheduldeRepository=vetScheduldeRepository;

    }
        
    getVet=async(VetId:string)=>{

        try {
            const pool = await sql.connect(config);
            const results = await pool
                .request()
                .input('VetId', sql.VarChar, VetId)
                .query(
                    'Select v.VetId, Name,LastName, Contact,HireDate, u.Email, ProfileImage From Vet v join [User] u on v.VetId=u.VetId where v.VetId=@VetId'
                );
            const vetRecord=results.recordset[0];

            if(vetRecord==undefined){
                return null;
            }

            let vetTypes= await this.vetTypeRepository.getVetTypes({ VetId: VetId});

            if (vetTypes === null) {
                vetTypes = [];
            }

            const vet=  new Vet(
                vetRecord.VetId,
                vetRecord.Name,
                vetRecord.LastName,
                vetRecord.Contact,
                vetRecord.Email,
                vetRecord.HireDate.toISOString().split('T')[0],
                vetRecord.ProfileImage,
                vetTypes
            );
            return vet;

        } catch (error) {
            console.log(error);

            return error;
    
        }

    };

    getVets = async (parameters: GetVetParameters) => {
        try {
  
            let vetsRecordset :any[]= [];
            const pool = await sql.connect(config);

            if (parameters.Date) {
                const newDate =getDayOfAWeekName(parameters.Date);

                const vetPool = await pool
                    .request()
                    .query(
                        `Select v.VetId, Name,LastName, Contact,HireDate, ProfileImage From Vet v join Schedulde s on v.VetId=s.VetId where ${newDate} is not null`
                    );
                vetsRecordset = vetPool.recordset;
            }  else if (parameters.VetType) {
                const vetPool = await pool
                    .request()
                    .input('VetType', sql.VarChar, parameters.VetType)
                    .query(
                        'Select v.VetId,v.Name,v.LastName, v.Contact,v.HireDate, v.ProfileImage From Vet v join VetTypeVet vtv on v.VetId=vtv.VetId join SurgeryType st on vtv.VetType=st.VetType where st.SurgeryType=@VetType'
                    );
                vetsRecordset = vetPool.recordset;
            } else if (!parameters.VetType &&  !parameters.Date) {
                const vetPool = await pool
                    .request()

                    .query('Select * From Vet ');
                vetsRecordset = vetPool.recordset;
            }

            let isEmpty: boolean;

            vetsRecordset[0] == undefined ? (isEmpty = true) : (isEmpty = false);
            if (isEmpty) {
                return null;
            } else {
                const vets:Vet[] = await Promise.all(
                    vetsRecordset.map(async (vet) => {
                 
                        let vetTypes: { VetType: string; Salary: number }[] =
            await this.vetTypeRepository.getVetTypes({ VetId: vet.VetId });

                        if (vetTypes === null) {
                            vetTypes = [];
                        }

                        return new Vet(
                            vet.VetId,
                            vet.Name,
                            vet.LastName,
                            vet.Contact,
                            vet.Email,
                            vet.HireDate.toISOString().split('T')[0],
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

    registerVet = async (vet) => {
        try {
            const VetId: string = createIDwithUUIDV4();
            const Email: string = vet.Email;
            const Password: string | null = vet.Password;
            const Name: string = vet.Name;
            const LastName: string = vet.LastName;
            const Contact: string =validateContact(vet.Contact);
            const HireDate: string = vet.HireDate;
            const ProfileImage: string | null = vet.ProfileImage;
            const VetType: string[] = vet.VetType;

            const hashedPassword = hashPassword(Password);
        

            const emailExists = await SharedRepository.emailExists(Email);
            console.log(emailExists);
            if (emailExists) {
                return null;
            }
            const pool = await sql.connect(config);
            const transaction = new sql.Transaction(pool);
        

            try {
         

                //    let registerOwnerPool=await pool.request()
          

                await transaction.begin();
                const results = await new sql.Request(transaction)
                    .input('VetId', sql.VarChar, VetId)
                    .input('Email', sql.VarChar, Email)
                    .input('Password', sql.VarChar, hashedPassword)
                    .input('Name', sql.VarChar, Name)
                    .input('LastName', sql.VarChar, LastName)
                    .input('Contact', sql.VarChar, Contact)
                    .input('HireDate', sql.VarChar, HireDate)
                    .input('ProfileImage', sql.VarChar, ProfileImage)
                    .query(
                        'EXEC CreateVet @VetId=@VetId ,@Email=@Email,@Password=@Password,@Name=@Name,@LastName=@LastName,@Contact=@Contact,@HireDate=@HireDate ,@ProfileImage=@ProfileImage'
                    );

                const  rowsAffected = results.rowsAffected[0];

                console.log(results);

                if (rowsAffected != 1) {
                    throw Error('');
                }

                if (VetType.length > 0) {
                    for await (const value of VetType) {
                        const vetTypeResult = await new sql.Request(transaction)
                            .input('VetId', sql.VarChar, VetId)
                            .input('VetType', sql.VarChar, value)
                            .query(
                                'Insert Into VetTypeVet(VetId,VetType) values(@VetId,@VetType)'
                            );

                        if (vetTypeResult.rowsAffected[0] != 1) {
                            throw Error('');
                        }
                    }
                }

                const createScheduldeResults = await this.vetScheduldeRepository.createSchedulde(
                    VetId,
                    transaction
                );
                if (createScheduldeResults != VetId) {
                    throw Error('');
                }

                console.log('CREATED');
                await transaction.commit();
                pool.close();
                return VetId;
            } catch (error) {
                console.log(error);
                await transaction.rollback();
                pool.close();
                throw Error('');
            }
        } catch (error:any) {
            if(error.message=='validationError'){
                return null;
            }
            console.log(error);
            return error;
        }
    };


    updateVet=async(Vet)=>
    {
        try {
            const VetId:string=Vet.VetId;
            const Name:string=Vet.Name;
            const LastName=Vet.LastName;
            const Email=Vet.Email;
            const Contact=validateContact(Vet.Contact);
            const HireDate=Vet.HireDate;
            const ProfileImage=Vet.ProfileImage;
            const OldEmail=Vet.OldEmail;
            const VetTypes=Vet.VetType;
            if(OldEmail!=Email){
                const emailExists = await SharedRepository.emailExists(Email);
                console.log(emailExists);
                if (emailExists) {
                    return null;
                }
            }
            const pool = await sql.connect(config);

            const transaction = await new sql.Transaction(pool);
            try{
           
        
         
                await transaction.begin();
                let results = await new sql.Request(transaction)
                    .input('VetId',sql.VarChar,VetId)
                    .input('Name',sql.VarChar,Name)
                    .input('LastName',sql.VarChar,LastName)
                    .input('Contact',sql.VarChar,Contact)
                    .input('ProfileImage',sql.VarChar,ProfileImage)
                    .input('HireDate',sql.VarChar,HireDate)
                    .query('Update Vet set Name=@Name, LastName=@LastName, Contact=@Contact, ProfileImage=@ProfileImage, HireDate=@HireDate  Where VetId=@VetId');
                console.log(results.rowsAffected);
                if(results.rowsAffected[0]!=1){
                    throw Error('');
                }

                results=await new sql.Request(transaction)
                    .input('Email',sql.VarChar,Email)
                    .input('VetId',sql.VarChar,VetId)
                    .query('Update [User] set Email=@Email Where VetId=@VetId');
            
                console.log(results.rowsAffected);
                if(results.rowsAffected[0]!=1){
                    throw Error('');
                }

           
           
                results= await new sql.Request(transaction)
                    .input('VetId',sql.VarChar,VetId)
                    .query('Delete From VetTypeVet Where VetId=@VetId');

                console.log(results);
                if( results instanceof Error ){
                    throw Error('Failed to delete from VetType');
                }
                if(VetTypes.length>0){
                    for await (const type of VetTypes){
                        const results = await new sql.Request(transaction)
                            .input('VetId',sql.VarChar,VetId)
                            .input('VetType',sql.VarChar,type)
                            .query('Insert Into VetTypeVet(VetId,VetType) values(@VetId,@VetType)');

                        console.log(results);
                        if(results.rowsAffected[0]!=1){
                            throw Error('Failed to insert into VetTypeVet');
                        }
                    }
                }
            
                await transaction.commit();
                return VetId;


            }catch(error){
                await transaction.rollback();
                console.log('Rollbacked');
                console.log(error);
                throw Error('');
            }


        } catch (error:any) {
            if(error.message=='validationError'){
                return null;
            }
            console.log(error);
            return error;

        
        }
    };

}


export default VetRepository;


