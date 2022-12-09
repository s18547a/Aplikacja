
import Vaccination from '../classes/Vaccination';
import VaccineType from '../classes/VaccineType';


const config = require('../../config/mssql/userConnection.js');
const sql = require('mssql');

class VaccineRepository{

    getAnimalCoreVaccineTypes=async(AnimalId:string)=>{
        try {
    
            const pool =await sql.connect(config);
    
            const results =await pool.request().input('AnimalId',sql.VarChar,AnimalId).
                query(
                    'Select VaccineType,Species,Core From VaccineType where Species=(Select Family \
            From AnimalType aty \
                join Animal a on aty.AnimalTypeId=a.AnimalTypeId \
                where a.AnimalId=@AnimalId) \
            AND VaccineType NOT IN  \
                (Select VaccineType From AnimalVaccine where AnimalId=@AnimalId) and Core=1 \
            union Select * From VaccineType where Species is null and core=1 and \
            VaccineType NOT IN \
            (Select VaccineType From AnimalVaccine  where AnimalId=@AnimalId )');
    
            const vaccineRecordset=results.recordset;
            if(vaccineRecordset.length==0){
    
                return null;
            }
            const coreVacciness:VaccineType[]=vaccineRecordset.map(vaccineRecord=>{
    
                return new VaccineType(vaccineRecord.VaccineType,vaccineRecord.Species,vaccineRecord.Core);
            });
    
            return coreVacciness;
    
           
    
           
            
        } catch (error) {
            console.log(error);
    
            return error;
        }
    
    
    };
    
    getAnimalVaccines=async(AnimalId:string)=>{
    
        try {
    
            const pool =await sql.connect(config);
    
            const results =await pool.request().input('AnimalId',sql.VarChar,AnimalId).query('Select * From AnimalVaccine Where AnimalId=@AnimalId');
    
            const vaccineRecordset=results.recordset;
            if(vaccineRecordset.length==0){
    
                return null;
            }
    
            const animalVaccinations:Vaccination[]=vaccineRecordset.map(vaccinationRecord=>{
    
                return new Vaccination(vaccinationRecord.AnimalId,vaccinationRecord.VaccineType,vaccinationRecord.Date.toISOString().split('T')[0]);
            });
    
            return animalVaccinations;
            
        } catch (error) {
            console.log(error);
    
            return error;
        }
    };
    
    
    getVaccineTypes=async(parameters:{unAdministratedAnimalId:string})=>{
        try {
            const pool =await sql.connect(config);
            let vaccineRecordset;
            if(parameters.unAdministratedAnimalId){
                const results = await pool.request().input('AnimalId',sql.VarChar,parameters.unAdministratedAnimalId).query(
                    '  Select * From VaccineType vt \
                    Where vt.VaccineType not in \
                    ( \
                    Select VaccineType \
                    From AnimalVaccine \
                    Where AnimalId=@AnimalId)\
                    and (vt.Species = \
                    (\
                    Select Family\
                    From Animal a \
                    join AnimalType aty  \
                    on a.AnimalTypeId=aty.AnimalTypeId \
                    where AnimalId=@AnimalId)\
                    or vt.Species is null\
                    )'
    
                );
    
                vaccineRecordset=results.recordset;
            }
            else{
                const results = await pool.request().query('Select * From VaccineType');
    
                vaccineRecordset=results.recordset;
            }
            if(vaccineRecordset.length==0){
    
                return null;
            }
    
           
    
            const vaccineTypes:VaccineType[]=vaccineRecordset.map(vaccineRecord=>{
    
                return new VaccineType(vaccineRecord.VaccineType,vaccineRecord.Species,vaccineRecord.Core);
            });
    
            return vaccineTypes;
            
        } catch (error) {
    
            console.log(error);
    
            return error;
            
        }
    
    
    };
    
    
}
export default VaccineRepository;