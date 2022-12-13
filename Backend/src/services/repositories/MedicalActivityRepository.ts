import MedicalActivity from '../../models/classes/MedicalActivity';
import Repository from './Repository';

const sql = require('mssql');


class MedicalActivityRepository extends Repository{
    constructor(db){
        super(db);
    }
    getMedicalActivities = async () => {
        try {
            const pool = await sql.connect(this.databaseConfiguration);
            const visitActivitiesPool = await pool
                .request()
                .query('Select * From MedicalActivity');
            const visitActivitiesRecordset = visitActivitiesPool.recordset;
      
            const medicalActivities = visitActivitiesRecordset.map((activit) => {
                return new MedicalActivity(
                    activit.MedicalActivityId,
                    activit.ActivityName,
                    activit.Price
                );
            });
      
            return medicalActivities;
        } catch (error) {
            console.log(error);
      
            return error;
        }
    };
    
    
    getVisitMedicalActivies=async(VisitId)=>{
    
        try {
            const pool = await sql.connect(this.databaseConfiguration);
            const results = await pool
                .request()
                .input('VisitId', sql.VarChar, VisitId)
                .query(
                    'Select vma.MedicalActivityId,ma.ActivityName,ma.Price From VisitMedicalActivities vma join MedicalActivity ma on vma.MedicalActivityId=ma.MedicalActivityId where vma.VisitId=@VisitId'
                );
            const visitMedicalActivitiesRecordset =
            results.recordset;
            if(results.recordset[0]==undefined){
                return [];
            }
        
            const visitMedicalActivies: MedicalActivity[] =
            visitMedicalActivitiesRecordset.map((visitActivity) => {
                return new MedicalActivity(
                    visitActivity.MedicalActivityId,
                    visitActivity.ActivityName,
                    visitActivity.Price
                );
            });
    
            return visitMedicalActivies;
            
        } catch (error) {
            console.log(error);
    
            return error;
            
        }
     
    
    
    };
      

}
export default MedicalActivityRepository;
