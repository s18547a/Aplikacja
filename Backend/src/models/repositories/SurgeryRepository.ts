const config = require('../../config/mssql/userConnection.js');
import sql from 'mssql';
import { getSurgeryPrameters } from '../classes/Interfaces';
import Surgery from '../classes/Surgery';

import { createIDwithUUIDV4 } from '../../utils/idHelpers';
const VetRepository = require('../repositories/VetRepository');
const AnimalRepository=require('../repositories/AnimalRepository');

exports.getSurgery=async(SurgeryId:string)=>{

    try {
        const pool = await sql.connect(config);

        const result = await pool.request().input('SurgeryId',sql.VarChar,SurgeryId)
            .query('Select * From Surgery Where SurgeryId=@SurgeryId');

        const surgeryRecord=result.recordset[0];

        if(surgeryRecord==undefined){
            return null;
        }
        const surgerysVet= await VetRepository.getVet(surgeryRecord.LeadVetId);

        const surgerysAnimal=await AnimalRepository.getAnimal(surgeryRecord.AnimalId);

        return new Surgery(surgeryRecord.SurgeryId,
            surgeryRecord.Date.toISOString().split('T')[0],surgeryRecord.SurgeryType,
            surgeryRecord.LeadVetId,surgeryRecord.Description,
            surgeryRecord.AnimalId,surgeryRecord.Report,surgeryRecord.StartTime,surgerysVet,surgerysAnimal);




    
    } catch (error) {
        console.log(error);
        return error;
    }

};

exports.getSurgeries = async (parameters: getSurgeryPrameters) => {
    try {
   
        let surgeryRecordset: any[] = [];
        const pool = await sql.connect(config);
   

   
        if(parameters.OwnerId){

            const surgeryPool= await pool.request().input('OwnerId',sql.VarChar,parameters.OwnerId)
                .query('Select SurgeryId,Date,SurgeryType,LeadVetId,Description,s.AnimalId,a.OwnerId,s.Report,s.StartTime From Surgery s join Animal a on s.AnimalId=a.AnimalId where a.OwnerId=@OwnerId');

            surgeryRecordset=surgeryPool.recordset;
        } 
        else if(parameters.VetId&&parameters.Date){
            const surgeryPool= await pool.request().input('LeadVetId',sql.VarChar,parameters.VetId).input('Date',sql.Date,parameters.Date)
                .query('Select SurgeryId,Date,SurgeryType,LeadVetId,Description,s.AnimalId,a.OwnerId,StartTime From Surgery s join Animal a on s.AnimalId=a.AnimalId where s.Date=@Date and s.LeadVetId=@LeadVetId');

            surgeryRecordset=surgeryPool.recordset;

        }
    
        else {
            const surgeryPool = await pool.request().query('Select * From Surgery');
            surgeryRecordset = surgeryPool.recordset;
    
        }

        let isEmpty: boolean;
        surgeryRecordset[0] == undefined ? (isEmpty = true) : (isEmpty = false);
        if (isEmpty) {
            return null;
        } else {
            const surgeries = await Promise.all(
                surgeryRecordset.map(async (surgery) => {

                    const surgerysVet= await VetRepository.getVet(surgery.LeadVetId);

                    const surgerysAnimal=await AnimalRepository.getAnimal(surgery.AnimalId);
                    return new Surgery(
                        surgery.SurgeryId,
                        surgery.Date.toISOString().split('T')[0],
                        surgery.SurgeryType,
                        surgery.LeadVetId,
                        surgery.Description,
                        surgery.AnimalId,
                        surgery.Report,
                        surgery.StartTime,
                        surgerysVet,
                        surgerysAnimal

                        // surgeryAssistants
                    );
          
                })
            );

    
            return surgeries;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.registerSurgery = async (Surgery) => {

    try {
        const pool =await sql.connect(config);
        const transaction = new sql.Transaction(pool);
        const newSurgeryId=createIDwithUUIDV4();
        const date:string=Surgery.Date;
        const LeadVetId:string=Surgery.LeadVetId;
        const AnimalId:string=Surgery.AnimalId;
        const SurgeryType=Surgery.SurgeryType;
        const StartTime=Surgery.StartTime;
        const Description=Surgery.Description;

        try {
            await transaction.begin();
            const results  = await new sql.Request(transaction)
                .input('SurgeryId',sql.VarChar,newSurgeryId)
                .input('Date',sql.VarChar,date)
                .input('LeadVetId',sql.VarChar,LeadVetId)
                .input('AnimalId',sql.VarChar,AnimalId)
                .input('SurgeryType',sql.VarChar,SurgeryType)
                .input('StartTime',sql.VarChar,StartTime)
                .input('Description',sql.VarChar,Description)
                .query('Insert into Surgery(SurgeryId,Date,SurgeryType,LeadVetId,Description,AnimalId,Report,StartTime) values(@SurgeryId,@Date,@SurgeryType,@LeadVetId,@Description,@AnimalId,null,@StartTime)');

            if(results.rowsAffected[0]!=1){
                throw Error('');

            }
    

            await transaction.commit();

            return newSurgeryId;
     
        } catch (error) {
            console.log(error);
            await  transaction.rollback();
            return Error('');
        }

    } catch (error) {
        console.log(error);

        return error;
    }
};

exports.updateSurgeryReport=async(surgeryReport)=>{

    try {
        const surgeryId=surgeryReport.SurgeryId;
        const Report = surgeryReport.Report;
        const pool =await sql.connect(config);
        const results = await pool.request().input('SurgeryId',sql.VarChar,surgeryId).input('Report',sql.VarChar,Report).query('Update Surgery Set Report=@Report Where SurgeryId=@SurgeryId');
    
        const resultAffected=results.rowsAffected[0];
        if(resultAffected!=1){
            throw Error('');
        }
        else return surgeryId;
    } catch (error) {
        console.log(error);
        return error;
    }

};
exports.getSurgeryTypes = async () => {
    try {
        const pool = await sql.connect(config);
        const poolSurgeryTypes = await pool
            .request()
            .query('Select * From SurgeryType');
        const surgeryTypesRecordset = poolSurgeryTypes.recordset;

        return surgeryTypesRecordset;
    } catch (error) {
        console.log(error);

        return error;
    }
};

exports.deleteSurgery=async(SurgeryId:string)=>{
    try {

        const pool =await sql.connect(config);
        const results =await pool.request().input('SurgeryId',sql.VarChar,SurgeryId)
            .query('Delete From Surgery Where SurgeryId=@SurgeryID ');

        const rowsAffected:number=results.rowsAffected[0];
        if(rowsAffected!=1){

            throw Error('');
        }
        return SurgeryId;
    
    } catch (error) {
        console.log(error);
    }
};