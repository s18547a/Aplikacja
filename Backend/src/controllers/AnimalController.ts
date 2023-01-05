

import AnimalMedicalInfo from '../models/classes/AnimalMedicalInfo';
import AnimalRepostiory from '../services/repositories/AnimalRepository';

import AnimalTypeRepository from '../services/repositories/AnimalTypeRepository';
import AnimalMedicalInfoRepository from '../services/repositories/AnimalMedicalInfoRepository';
import AnimalIllnessRepository from '../services/repositories/AnimalIllnessRepository';
import { AnimalParametersType } from '../common/Types';


class AnimalController{
    
    animalRepository:AnimalRepostiory;
    animalTypeRepository:AnimalTypeRepository;
    animalMedicalInfoRepository:AnimalMedicalInfoRepository;
    animalIllnessRepository:AnimalIllnessRepository;
  

    constructor(
        animalRepository:AnimalRepostiory,
        animalTypeRepository:AnimalTypeRepository,
        animalMedicalInfoRepository:AnimalMedicalInfoRepository,
        animalIllnessRepository:AnimalIllnessRepository){
        this.animalRepository=animalRepository;
        this.animalTypeRepository=animalTypeRepository;
        this.animalMedicalInfoRepository=animalMedicalInfoRepository;
        this.animalIllnessRepository=animalIllnessRepository;
    }
   
   
    getAnimal=async (req,res)=>{
        const AnimalId=req.params.AnimalId;
      
        const result  = await this.animalRepository.getAnimal(AnimalId);
        
        if (result instanceof Error) {
            return res.status(500).json({});
        } else if (result === null) {
            return res.status(404).json({});
        } else res.status(200).json(result);

    };

    
    getAnimals=async(req, res)=>{
  
        const parameters: AnimalParametersType = {
       
            OwnerId: req.query.OwnerId as any,
            Email: req.query.Email as any,
        };

        const result = await this.animalRepository.getAnimals(parameters,this.animalTypeRepository);

        if (result instanceof Error) {
            return res.status(500).json({});
        } else if (result === null) {
            return res.status(404).json({});
        } else res.status(200).json(result);
    };


    registerAnimal= async (req, res)=>{
        const Animal = req.body;
        const results = await this.animalRepository.registerAnimal(Animal);
        
        if (results instanceof Error) {
            return res.status(500).json({ message: 'Błąd' });
        } else return res.status(201).json({newId:results});
    };

    updateAnimal=async(req, res)=>{
        const updatedAnimal = req.body;

        const results = await this.animalRepository.updateAnimal(updatedAnimal);

        if (results instanceof Error) {
            return res.status(500).json({});
        } else return res.status(201).json({});
    };



    
    getAnimalTypes= async(req, res) => {
        const parameters: { AnimalTypeId: string | undefined } = {
            AnimalTypeId: req.query.AnimalTypeId as any,
        };
        await this.animalTypeRepository.getAnimalTypes(parameters).then((data) => {
            if (data instanceof Error) {
                return res.status(500).json({ message: 'Błąd' });
            } else return res.status(200).json(data);
        });
    };


    getIllnesses=async (req, res) => {
        const parameters = {AnimalId:req.params.AnimalId};
        // = { AnimalId: req.query.AnimalId };

        const results = await this.animalIllnessRepository.getIllnesses(parameters);
        if (results instanceof Error) {
            return res.status(500).json(results);
        } else if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };

    updateIllness=async (req, res) => {
        const parameters = {
            AnimalId: req.body.AnimalId,
            Description: req.body.Description,
            VisitId: req.body.VisitId,
            RecoveryDate: req.body.RecoveryDate,
        };

        const results = await this.animalIllnessRepository.setIllnessCured(parameters);
        if (results instanceof Error) {
            return res.status(500).json({});
        } else if (results == 1) {
            return res.status(201).json({});
        }
    };


    getMedicalInfo =async (req, res) => {
 
        const AnimalId =req.params.AnimalId;
        //= req.query.AnimalId;
        console.log(AnimalId);
        const results = await this.animalMedicalInfoRepository.getAnimalMedicalInformation(AnimalId);
        if (results instanceof Error) {
            return res.status(500).json({});
        } else if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };

    updateMedicalInfo=async (req, res) => {
  
        const animalMedicalInfo: AnimalMedicalInfo = req.body;
        const results = await this.animalMedicalInfoRepository.updateAnimalMedicalInfo(
            animalMedicalInfo
        );
        if (results instanceof Error) {
            return res.status(500).json({});
        } else return res.status(201).json({});
    };


}
export default AnimalController;
