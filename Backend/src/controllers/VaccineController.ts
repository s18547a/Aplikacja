import VaccineRepository from '../services/repositories/VaccineRepository';

//const VaccineRepository=require('../models/repositories/VaccineRepository');
interface getVaccineTypesParameters{unAdministratedAnimalId:string}
class VaccineController{

    vaccineRepository:VaccineRepository;
    constructor(vaccineReposity:VaccineRepository){
        this.vaccineRepository=vaccineReposity;
    }

    getAnimalCoreVaccineTypes=async(req,res)=>{

        const AnimalId:string=req.params.AnimalId;
    
        const results = await this.vaccineRepository.getAnimalCoreVaccineTypes(AnimalId);
    
        if(results instanceof Error){
    
            return res.status(500).json({});
        }
        else if(results ==null){
            return res.status(404).json({});
        }
        else return res.status(200).json(results);
    
    
    };
    
    getAnimalVaccines=async(req,res)=>{
    
        const AnimalId:string=req.params.AnimalId;
        const UnusedVaccines=req.params.UnusedVaccines;
    
        const results= await this.vaccineRepository.getAnimalVaccines(AnimalId);
    
        if(results instanceof Error){
    
            return res.status(500).json({});
        }
        else if(results ==null){
            return res.status(404).json({});
        }
        else return res.status(200).json(results);
    
    };
    
  
    
    getVaccineTypes=async(req,res)=>{
    
    
        const parameters:getVaccineTypesParameters={ unAdministratedAnimalId:req.query.unAdministratedAnimalId};
        console.log(parameters);
       
        const results = await this.vaccineRepository.getVaccineTypes(parameters);
    
        if(results instanceof Error){
    
            return res.status(500).json({});
        }
        else if (results == null){
    
            return res.status(404).json({});
        }
        else return res.status(200).json(results);
    
    };

}
export default VaccineController;
