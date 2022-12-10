import { getVetTypesParameters } from '../classes/Interfaces';
import Repository from './Repository';
const sql = require('mssql');


class VetTypeRepository extends Repository{

    constructor(db){
        super(db);
    }
    
    getVetTypes=async(parameters:getVetTypesParameters)=>{
        try {
            const returnList=true;
            let VetTypeRecoordset;
            const pool = await sql.connect(this.databaseConfiguration);
            if(parameters.VetId){
                const vetTypePool= await pool.request().input('VetId',sql.VarChar,parameters.VetId).query('Select vtv.VetType, vt.Salary From Vet v inner join VetTypeVet vtv on v.VetId=vtv.VetId join VetType vt on vtv.VetType=vt.VetType where v.VetId=@VetId');
                VetTypeRecoordset=vetTypePool.recordset;
          
            }
            else{
                const vetTypePool= await pool.request().query('Select * From VetType');
                VetTypeRecoordset=vetTypePool.recordset;
            }
      
      
            let isEmpty:boolean;
            VetTypeRecoordset[0]==undefined?isEmpty=true:isEmpty=false;
      
            if(isEmpty){
                return null;
            }
            else{
                if(!returnList&&VetTypeRecoordset.length==1){
                    return VetTypeRecoordset[0];
                }
                else return VetTypeRecoordset;
         
            }
      
       
          
        } catch (error) {
            console.log(error);
            return error;
          
        }
        
      
         
    };
}
export default VetTypeRepository;