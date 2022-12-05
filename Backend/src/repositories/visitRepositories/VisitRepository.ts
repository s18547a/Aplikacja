const config = require('../../services/userConnection');
const sql = require('mssql');
import Animal from '../../classes/Animal';
import { GetVisitPrarameters } from '../../classes/Interfaces';
import Vet from '../../classes/Vet';

import Visit from '../../classes/Visit';
import { createIDwithUUIDV4 } from '../../utils/idHelpers';

const AnimalRepository = require('../../repositories/animalRepositories/AnimalRepository');
const VetRepository = require('../../repositories/vetRepositories/VetRepository');
const VisitMedicalActivitiesRepository=require('./MedicalActivityRepository');
const ReservationRepository=require('../ReservationRepository');
exports.getVisit=async(VisitId)=>{


    try {
        const pool =await sql.connect(config);
        const results = await pool
            .request()
            .input('VisitId', sql.VarChar, VisitId)
            .query(
                'Select VisitId, Date,Hour,v.Note,a.AnimalId, v.VetId , v.Bill , a.Name as \'AnimalName\',vt.Name as \'VetName\',vt.LastName as \'VetLastName\' From Visit v join Animal a  on v.AnimalId=a.AnimalId join Vet vt on v.VetId=vt.VetId Where VisitId=@VisitId'
            );
        const visitRecord=results.recordset[0];

        if(visitRecord==undefined){

            return null;
        }
        const visitMedicalActivies =await VisitMedicalActivitiesRepository.getVisitMedicalActivies(VisitId);

        const visitVet: Vet = await VetRepository.getVet(visitRecord.VetId);
        const visitAnimal: Animal = await AnimalRepository.getAnimal(visitRecord.AnimalId);
 
        return new Visit(
            visitRecord.VisitId,
            visitRecord.VetId,
            visitRecord.AnimalId,
            visitRecord.Date.toISOString().split('T')[0],
            visitRecord.Hour,
            visitRecord.Note,
            visitRecord.Bill,
            visitMedicalActivies,
            visitVet,
            visitAnimal
        );
          
    } catch (error) {
          
        console.log(error);

        return error;
    }

};

exports.getVisits = async (parameters: GetVisitPrarameters) => {
    try {
        console.log(parameters);

   
        const pool = await sql.connect(config);
        let visitRecordset;
        if ( !parameters.AnimalId &&!parameters.VetId &&!parameters.OwnerId && !parameters.Name
        ) {
            const visitsPool = await pool.request().query('Select * From Visit Order By Date DESC');
            visitRecordset = visitsPool.recordset;
        } else if (parameters.AnimalId) {
            const visitsPool = await pool
                .request()
                .input('AnimalId', sql.VarChar, parameters.AnimalId)
                .query(
                    'Select VisitId, Date,Hour,v.Note,a.AnimalId, v.VetId, v.Bill ,a.Name as \'AnimalName\',vt.Name as \'VetName\',vt.LastName as \'VetLastName\' From Visit v join Animal a  on v.AnimalId=a.AnimalId join Vet vt on v.VetId=vt.VetId Where a.AnimalId=@AnimalId order by Date DESC'
                );
            visitRecordset = visitsPool.recordset;
        } else if (parameters.VetId) {
            const visitsPool = await pool
                .request()
                .input('VetId', sql.VarChar, parameters.VetId)
                .query(
                    'Select VisitId, Date,Hour,v.Note,a.AnimalId, v.VetId, v.Bill , a.Name as \'AnimalName\',vt.Name as \'VetName\',vt.LastName as \'VetLastName\' From Visit v join Animal a  on v.AnimalId=a.AnimalId join Vet vt on v.VetId=vt.VetId Where VetId=@VetId order by Date DESC'
                );
            visitRecordset = visitsPool.recordset;
        }  else if (parameters.OwnerId) {
            const visitsPool = await pool
                .request()
                .input('OwnerId', sql.VarChar, parameters.OwnerId)
                .query(
                    'Select VisitId, Date,Hour,v.Note,a.AnimalId, v.VetId, v.Bill , a.Name as \'AnimalName\',vt.Name as \'VetName\',vt.LastName as \'VetLastName\' From Visit v join Animal a  on v.AnimalId=a.AnimalId join Vet vt on v.VetId=vt.VetId  Where OwnerId=@OwnerId order by Date DESC'
                );
            visitRecordset = visitsPool.recordset;
      
        } else if (parameters.Name) {
            const visitsPool = await pool
                .request()

                .query(
                    `Select VisitId, Date,Hour,v.Note,a.AnimalId, v.VetId, v.Bill , a.Name as 'AnimalName',vt.Name as 'VetName',vt.LastName as 'VetLastName' From Visit v join Animal a  on v.AnimalId=a.AnimalId join Vet vt on v.VetId=vt.VetId  Where a.Name like '${parameters.Name}%' order by Date DESC`
                );
            visitRecordset = visitsPool.recordset;
   
        } 

        let isEmpty: boolean;

        visitRecordset[0] == undefined ? (isEmpty = true) : (isEmpty = false);
        if (isEmpty) {
            pool.close();
            return null;
        } else {
      

            const  visits = await Promise.all(
                visitRecordset.map(async (visit) => {
          
                    const visitMedicalActivies =await VisitMedicalActivitiesRepository.getVisitMedicalActivies(visit.VisitId);

                    const visitVet: Vet = await VetRepository.getVet( visit.VetId);
                    const visitAnimal: Animal = await AnimalRepository.getAnimal(visit.AnimalId);

                    return new Visit(
                        visit.VisitId,
                        visit.VetId,
                        visit.AnimalId,
                        visit.Date.toISOString().split('T')[0],
                        visit.Hour,
                        visit.Note,
                        visit.Bill,
                        visitMedicalActivies,
                        visitVet,
                        visitAnimal
                    );
                })
            );
    

    
            return visits;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.createVisit = async (Visit) => {
    try {
        const pool = await sql.connect(config);
        const transaction = await new sql.Transaction(pool);
        try {
            const VisitId = createIDwithUUIDV4();
            const newVetId = Visit.VetId;
            const newAnimalId = Visit.AnimalId;
            const newDate = Visit.Date;
            const newHour = Visit.Hour;
            const newNote = Visit.Note;
            const newBill = Visit.Bill;
            const selectedActivites = Visit.MedicalActivities;
            const diagnosisList = Visit.DiagnosisList;
            const vaccineList=Visit.VaccineList;
            const cannceledReservation=Visit.ReservationId;

            await transaction.begin();

            //  const visitPool= await pool.request()
            const results = await new sql.Request(transaction)
                .input('VisitId', sql.VarChar, VisitId)
                .input('VetId', sql.VarChar, newVetId)
                .input('AnimalId', sql.VarChar, newAnimalId)
                .input('Date', sql.Date, newDate)
                .input('Hour', sql.VarChar, newHour)
                .input('Note', sql.VarChar, newNote)
                .input('Bill', sql.Int, newBill)
                .query(
                    'INSERT INTO Visit(VisitId,VetId,AnimalId,Date,Hour,Note,Bill) values (@VisitId,@VetId,@AnimalId,@Date,@Hour,@Note,@Bill)'
                );

            const rowsAffected = results.rowsAffected[0];

            if (rowsAffected != 1) {
                throw Error('');
            }

            if (selectedActivites.length > 0) {
                for await (const activity of selectedActivites) {
                    // const activityPool =
                    //  await pool.request()

                    const resultsS = await new sql.Request(transaction)
                        .input('MedicalActivityId', sql.VarChar, activity)
                        .input('VisitId', sql.VarChar, VisitId)
                        .query(
                            'Insert into VisitMedicalActivities(MedicalActivityId,VisitId) values (@MedicalActivityId,@VisitId)'
                        );
                    console.log('RESULTS');
                    if (resultsS.rowsAffected[0] != 1) {
                        throw Error('');
                    }
                }
            }

            if (diagnosisList.length > 0) {
                for await (const diagnosis of diagnosisList) {
                    const resultsD = await new sql.Request(transaction)
                        .input('AnimalId', sql.VarChar, newAnimalId)
                        .input('VisitId', sql.VarChar, VisitId)
                        .input('Description', sql.VarChar, diagnosis.Description)
                        .input('DiagnosisDate', sql.Date, newDate)
                        .query(
                            'Insert into Illness(AnimalId,VisitId,Description,DiagnosisDate) values (@AnimalId,@VisitId,@Description,@DiagnosisDate)'
                        );
                    if (resultsD.rowsAffected[0] != 1) {
                        throw Error('');
                    }
                }
            }
            if(vaccineList.length>0 ){
                //  const date = getCurrentDate();

                for await(const VaccineType of vaccineList){
                    const result = await new sql.Request(transaction)
                        .input('AnimalId',sql.VarChar,newAnimalId)
                        .input('VaccineType',sql.VarChar,VaccineType)
                        .input('Date',sql.Date,newDate)
                        .query('Insert into AnimalVaccine values(@VaccineType,@AnimalId,@Date)');
  
                    const rowsAffected= result.rowsAffected;
                    if(rowsAffected!=1){
                        throw Error('');
                    }

                }
       
       
        
            }
            if(cannceledReservation!=''){

                const rowsAffected=await ReservationRepository.cancelReservation(cannceledReservation,transaction);
                if(rowsAffected!=1){
                    throw Error('');
                }
            }

            await transaction.commit();
     
            return VisitId;
        } catch (error) {
            await transaction.rollback();
            pool.close();
            console.log(error);
            throw Error('');
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

