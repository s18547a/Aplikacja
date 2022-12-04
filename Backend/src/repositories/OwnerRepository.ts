const config = require('../db/UserConnection');
import sql from 'mssql';
import { GetOwnerParamters } from '../classes/Interfaces';
import Owner from '../classes/Owner';
import { createIDwithUUIDV4 } from '../helpers/idHelpers';

const authUtils = require('../auth/authUtils');
const SharedRepository = require('./SharedRepository');



exports.getOwner=async(OwnerId)=>{
    try {
        const pool = await sql.connect(config);
        const result = await pool
            .request().input('OwnerId',sql.VarChar,OwnerId)
            .query(
                'Select o.OwnerId,Name,LastName,Contact,Email From Owner o inner join [User] u on o.OwnerId=u.OwnerId where o.OwnerId=@OwnerId'
            );

        const ownerRecord=result.recordset[0];
        if(ownerRecord==undefined){
            return null;
        }
 
        const owner= new Owner(
            ownerRecord.OwnerId,
            ownerRecord.Name,
            ownerRecord.LastName,
            ownerRecord.Contact,
            ownerRecord.Email,
            ownerRecord.Password
        );

        return owner;
    
    } catch (error) {
        console.log(error);
        return error;
    
    }

  


};

exports.getOwners = async (parameters: GetOwnerParamters) => {
    try {
  
        const pool = await sql.connect(config);
        let ownerRecordset;
        if (!parameters.AnimalId) {
            const result = await pool
                .request()
                .query(
                    'Select o.OwnerId,Name,LastName,Contact,Email From Owner o inner join [User] u on o.OwnerId=u.OwnerId'
                );

            ownerRecordset = result.recordset;
        } 
        
        let isEmpty: boolean;
        ownerRecordset[0] == undefined ? (isEmpty = true) : (isEmpty = false);

        if (isEmpty) {
            //  pool.close();
            return null;
        } else {
            const owners = ownerRecordset.map((owner) => {
                return new Owner(
                    owner.OwnerId,
                    owner.Name,
                    owner.LastName,
                    owner.Contact,
                    owner.Email,
                    owner.Password
                );
            });

      
            return owners;
      
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.registerOwner = async (owner) => {
    try {
        const pool = await sql.connect(config);
        const transaction = new sql.Transaction(pool);
   
        try{
            const UserId: string = createIDwithUUIDV4();
            const Email: string = owner.Email;
            const Password: string | null = owner.Password;
            const Name: string = owner.Name;
            const LastName: string = owner.LastName;
            const Contact: string = owner.Contact;
    
  
  
            const hashedPassword = authUtils.hashPassword(Password);
            // let hashedPassword = Password;
  
            const emailExists = await SharedRepository.emailExists(Email);
          
            if (emailExists) {
                return null;
            }
    
            await transaction.begin();
            const results = await new sql.Request(transaction)
                .input('UserId', sql.VarChar, UserId)
                .input('Email', sql.VarChar, Email)
                .input('Password', sql.VarChar, hashedPassword)
                .input('Name', sql.VarChar, Name)
                .input('LastName', sql.VarChar, LastName)
                .input('Contact', sql.VarChar, Contact)
                .query('INSERT INTO Owner(OwnerId,Name,LastName,Contact) Values(@UserId,@Name,@LastName,@Contact)');
  
            if(results.rowsAffected[0]!=1){
                throw Error('');
            }
            else
            {
                const results = await new sql.Request(transaction)
                    .input('UserId', sql.VarChar, UserId)
                    .input('Email', sql.VarChar, Email)
                    .input('Password', sql.VarChar, hashedPassword)
         
                    .query('INSERT INTO [USER](UserId,Email,Password,OwnerId,VetId,Manager)values(@UserId,@Email,@Password,@UserId,null,null);');

                if(results.rowsAffected[0]!=1){
                    throw Error('');
                }
                await transaction.commit();
                return UserId;
            }

        } catch(error){
            transaction.rollback();
            console.log(error);
            return Error('');
        }
  
    } catch (error: unknown) {
        console.log(error);

        return error;
    }
};
