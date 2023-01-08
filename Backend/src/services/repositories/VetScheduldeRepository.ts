


import { config } from 'process';
import { GetScheduldeParamters } from '../../common/Types';
import { getDayOfAWeekName } from '../../utils/dateHelper';
import Repository from './Repository';

import ScheduldeHelperRepository from './ScheduldeHelperRepository';


const sql = require('mssql');

class VetScheduldeRepository extends Repository{

    scheduldeHelperRepository;  
    constructor(db,scheduldeHelperRepository:ScheduldeHelperRepository){
        super(db);
        this.scheduldeHelperRepository=scheduldeHelperRepository;
        
    }
    
    getSchedulde = async (VetId: string) => {
        try {
            const pool = await sql.connect(this.databaseConfiguration);
            
            const scheduldePool = await pool
                .request()
                .input('VetId', sql.VarChar, VetId)
                .query(
                    'Select Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday From Schedulde Where VetId=@VetId'
                );
  
            const scheduldeRecordset = scheduldePool.recordset;
  
            let isEmpty: boolean;
  
            scheduldeRecordset[0] == undefined ? (isEmpty = true) : (isEmpty = false);
            if (isEmpty) {
                return null;
            } else return scheduldeRecordset[0];
        } catch (error) {
            console.log(error);
  
            return error;
        }
    };

    getVetDaysOfWeek = async (VetId: string) => {
        try {
            const pool = await sql.connect(this.databaseConfiguration);
            const scheduldePool = await pool
                .request()
                .input('VetId', sql.VarChar, VetId)
                .query(
                    'Select Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday From Schedulde Where VetId=@VetId'
                );
            const scheduldeRecordset = scheduldePool.recordset;
  
            const scheduledDaysOfWeek: string[] = [];
            if (scheduldeRecordset[0] == undefined) {
                return null;
            }
  
            for await(const [name, value] of Object.entries(scheduldeRecordset[0])) {
                if (value != null) {
          
                    //     const translated=await dateHelper.translateDayOfWeekName(name);
                    scheduledDaysOfWeek.push(name);
                }
            }
  
            return scheduledDaysOfWeek;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
  
    
  
    updateSchedulde = async (schedulde) => {    
        try{
            console.log(schedulde);
            const vetId: string = schedulde.VetId;
            const monday: string | null = schedulde.Monday;
            const tuesday: string | null = schedulde.Tuesday;
            const wednesday: string | null = schedulde.Wednesday;
            const thursday: string | null = schedulde.Thursday;
            const friday: string | null = schedulde.Friday;
            const saturday: string | null = schedulde.Saturday;
            const sunday: string | null = schedulde.Sunday;
            const pool = await sql.connect(this.databaseConfiguration);
            const transaction = await new sql.Transaction(pool);

        try {
          
            
           
                await transaction.begin();
                let results = await new sql.Request(transaction)
                .input('VetId', sql.VarChar, vetId)
                .input('Monday', sql.VarChar, monday)
                .input('Tuesday', sql.VarChar, tuesday)
                .input('Wednesday', sql.VarChar, wednesday)
                .input('Thursday', sql.VarChar, thursday)
                .input('Friday', sql.VarChar, friday)
                .input('Saturday', sql.VarChar, saturday)
                .input('Sunday', sql.VarChar, sunday)
                .query(
                    'Update Schedulde set Monday=@Monday,Tuesday=@Tuesday, Wednesday=@Wednesday, Thursday=@Thursday, Friday=@Friday, Saturday=@Saturday, Sunday=@Sunday Where VetId=@VetId'
                );

           
  
            const rowsAffected = results.rowsAffected[0];
            if (rowsAffected != 1) {
                throw Error('Updating Schedulde failed');
            } 

            results=await new sql.Request(transaction).input('VetId', sql.VarChar,vetId)
            .query('Delete From Reservation Where VetId=@VetId ');

            results=await new sql.Request(transaction).input('LeadVetId', sql.VarChar,vetId)
            .query('Delete From Surgery Where LeadVetId=@LeadVetId and Report=null');
            

           await transaction.commit();
            return vetId;





        } catch (error) {
            console.log(error);
            transaction.rollback();
            throw Error(String(error));
        }
    }catch (error){
     
        console.log(error);
        return error
    }
    };
  
  
    getAvailableHours = async (paramters: GetScheduldeParamters) => {
        try {
            let scheduldeRecordset = [];
            const pool = await sql.connect(this.databaseConfiguration);
     
            /*  const newDate=new Date(paramters.Date)
                const day= newDate.toLocaleDateString("en-PL",{weekday:'long'})*/
            const day: string =getDayOfAWeekName(paramters.Date);
            console.log(day);
            const scheduldePool = await pool
                .request()
                .input('VetId', sql.VarChar, paramters.VetId)
                .query(`Select ${day} From Schedulde Where VetId=@VetId`);
            scheduldeRecordset = scheduldePool.recordset[0];
      
            console.log(scheduldeRecordset);
            let isEmpty: boolean;
  
            scheduldeRecordset == undefined ? (isEmpty = true) : (isEmpty = false);
            if (isEmpty) {
                pool.close();
                return null;
            } else {

                const results= await this.scheduldeHelperRepository.createVatAvailableHours(scheduldeRecordset,paramters);
                
                return results;
         
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    };

     
    getFullSchedulde = async () => {
        try {
            const pool = await sql.connect(this.databaseConfiguration);
            
            const scheduldePool = await pool
                .request()
               
                .query(
                    'Select v.VetId, v.Name, v.LastName, Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday From Schedulde s join Vet v on s.VetId=v.VetId'
                );
  
            const scheduldeRecordset = scheduldePool.recordset;
  
            let isEmpty: boolean;
  
            scheduldeRecordset[0] == undefined ? (isEmpty = true) : (isEmpty = false);
            if (isEmpty) {
                return null;
            } else return scheduldeRecordset;
        } catch (error) {
            console.log(error);
  
            return error;
        }
    };

   

}
export default VetScheduldeRepository;
