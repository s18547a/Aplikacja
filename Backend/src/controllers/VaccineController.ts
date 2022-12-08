
const VaccineRepository=require('../models/repositories/VaccineRepository');
interface getVaccineTypesParameters{unAdministratedAnimalId:string}
class VaccineController{
    async getAnimalCoreVaccineTypes(req,res){

        const AnimalId:string=req.params.AnimalId;
    
        const results = await VaccineRepository.getAnimalCoreVaccineTypes(AnimalId);
    
        if(results instanceof Error){
    
            return res.status(500).json({});
        }
        else if(results ==null){
            return res.status(404).json({});
        }
        else return res.status(200).json(results);
    
    
    }
    
    async getAnimalVaccines(req,res){
    
        const AnimalId:string=req.params.AnimalId;
        const UnusedVaccines=req.params.UnusedVaccines;
    
        const results= await VaccineRepository.getAnimalVaccines(AnimalId);
    
        if(results instanceof Error){
    
            return res.status(500).json({});
        }
        else if(results ==null){
            return res.status(404).json({});
        }
        else return res.status(200).json(results);
    
    }
    
  
    
    async getVaccineTypes(req,res){
    
    
        const parameters:getVaccineTypesParameters={ unAdministratedAnimalId:req.query.unAdministratedAnimalId};
        console.log(parameters);
       
        const results = await VaccineRepository.getVaccineTypes(parameters);
    
        if(results instanceof Error){
    
            return res.status(500).json({});
        }
        else if (results == null){
    
            return res.status(404).json({});
        }
        else return res.status(200).json(results);
    
    }

}
export default VaccineController;
/*
export const getAnimalCoreVaccineTypes=async(req,res)=>{

    const AnimalId:string=req.params.AnimalId;

    const results = await VaccineRepository.getAnimalCoreVaccineTypes(AnimalId);

    if(results instanceof Error){

        return res.status(500).json({});
    }
    else if(results ==null){
        return res.status(404).json({});
    }
    else return res.status(200).json(results);


};

export const getAnimalVaccines=async(req,res)=>{

    const AnimalId:string=req.params.AnimalId;
    const UnusedVaccines=req.params.UnusedVaccines;

    const results= await VaccineRepository.getAnimalVaccines(AnimalId);

    if(results instanceof Error){

        return res.status(500).json({});
    }
    else if(results ==null){
        return res.status(404).json({});
    }
    else return res.status(200).json(results);

};

interface getVaccineTypesParameters{unAdministratedAnimalId:string}

export const getVaccineTypes=async (req,res)=>{


    const parameters:getVaccineTypesParameters={ unAdministratedAnimalId:req.query.unAdministratedAnimalId};
    console.log(parameters);
   
    const results = await VaccineRepository.getVaccineTypes(parameters);

    if(results instanceof Error){

        return res.status(500).json({});
    }
    else if (results == null){

        return res.status(404).json({});
    }
    else return res.status(200).json(results);

};


*/

