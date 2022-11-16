import MedicalActivity from "../../classes/MedicalActivity";
const config = require("../../db/userConnection");
const sql = require("mssql");


exports.getMedicalActivities = async () => {
    try {
      let pool = await sql.connect(config);
      let visitActivitiesPool = await pool
        .request()
        .query("Select * From MedicalActivity");
      let visitActivitiesRecordset = visitActivitiesPool.recordset;
  
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


  exports.getVisitMedicalActivies=async(VisitId)=>{

    try {
        let pool = await sql.connect(config);
        const results = await pool
        .request()
        .input("VisitId", sql.VarChar, VisitId)
        .query(
          "Select vma.MedicalActivityId,ma.ActivityName,ma.Price From VisitMedicalActivities vma join MedicalActivity ma on vma.MedicalActivityId=ma.MedicalActivityId where vma.VisitId=@VisitId"
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

        return visitMedicalActivies
        
    } catch (error) {
        console.log(error)

        return error
        
    }
 


  }
  