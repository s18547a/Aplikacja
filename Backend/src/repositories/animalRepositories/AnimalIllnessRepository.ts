import Illness from '../../classes/Illness';
import { IllnessCuredParameters } from '../../classes/Interfaces';

const config = require('../../db/userConnection');
const sql = require('mssql');


exports.getIllnesses = async (parameters: IllnessCuredParameters) => {
    try {
        const pool = await sql.connect(config);
        let illnessRecordest;
        if (parameters.AnimalId) {
            const illnessPool = await pool
                .request()
                .input('AnimalId', sql.VarChar, parameters.AnimalId)
                .query(
                    'Select * From Illness Where AnimalId=@AnimalId Order By RecoveryDate,DiagnosisDate DESC'
                );
            illnessRecordest = illnessPool.recordset;
        } else {
            const illnessPool = pool.request().query('Select * From Illness ');
            illnessRecordest = illnessPool.recordset;
        }
  
        let isEmpty: boolean;
  
        illnessRecordest[0] == undefined ? (isEmpty = true) : (isEmpty = false);
  
        if (isEmpty) {
            return null;
        } else {
            
            const illnessList:Illness[] = illnessRecordest.map((illness) => {
                let recDate = illness.RecoveryDate;
                if (recDate != null) {
                    recDate = recDate.toISOString().split('T')[0];
                }
  
                return new Illness(
                    illness.AnimalId,
                    illness.VisitId,
                    illness.Description,
                    illness.DiagnosisDate.toISOString().split('T')[0],
                    recDate
                );
            });
  
            return illnessList;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
  
  
exports.setIllnessCured = async (parameters: IllnessCuredParameters) => {
    try {
        const pool = await sql.connect(config);
  
        const illenssPool = await pool
            .request()
            .input('AnimalId', sql.VarChar, parameters.AnimalId)
            .input('Description', sql.VarChar, parameters.Description)
            .input('VisitId', sql.VarChar, parameters.VisitId)
            .input('RecoveryDate', sql.VarChar, parameters.RecoveryDate)
            .query(
                'Update Illness Set RecoveryDate=@RecoveryDate  Where VisitId=@VisitId And AnimalId=@AnimalId and Description=@Description'
            );
  
        const rowsAffected = illenssPool.rowsAffected[0];
        if (rowsAffected == 1) {
            return 1;
        } else throw Error;
    } catch (error) {
        console.log(error);
        return error;
    }
};


