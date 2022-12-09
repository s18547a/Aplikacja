import Animal from '../models/classes/Animal';
import { AnimalParametersType } from '../models/classes/Interfaces';
import AnimalMedicalInfo from '../models/classes/AnimalMedicalInfo';
import AnimalRepostiory from '../models/repositories/AnimalRepository';
//import AnimalType from '../models/classes/AnimalType';
import AnimalTypeRepository from '../models/repositories/AnimalTypeRepository';
import AnimalMedicalInfoRepository from '../models/repositories/AnimalMedicalInfoRepository';
import AnimalIllnessRepository from '../models/repositories/AnimalIllnessRepository';
//const AnimalRepository = require('../models/repositories/AnimalRepository.ts');
//const AnimalTypeRepository = require('../models/repositories/AnimalTypeRepository');
//const AnimalMedicalInfoRepository=require('../models/repositories/AnimalMedicalInfoRepository');
//const AnimalIllnessRepository=require('../models/repositories/AnimalIllnessRepository');

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
        const Animal: Animal = req.body;
        const results = await this.animalRepository.registerAnimal(Animal);
        console.log(results);
        if (results instanceof Error) {
            return res.status(500).json({ message: 'Błąd' });
        } else return res.status(201).json({});
    };

    updateAnimal=async(req, res)=>{
        const updatedAnimal: Animal = req.body;

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
/*
export const getAnimal=async(req,res)=>{

    const AnimalId=req.params.AnimalId;

    const result  =await AnimalRepository.getAnimal(AnimalId);

    if (result instanceof Error) {
        return res.status(500).json({});
    } else if (result === null) {
        return res.status(404).json({});
    } else res.status(200).json(result);

};


export const getAnimals= async (req, res) => {
  
    const parameters: AnimalParametersType = {
       
        OwnerId: req.query.OwnerId as any,
        Email: req.query.Email as any,
    };

    const result = await AnimalRepository.getAnimals(parameters);

    if (result instanceof Error) {
        return res.status(500).json({});
    } else if (result === null) {
        return res.status(404).json({});
    } else res.status(200).json(result);
};


export const registerAnimal= async (req, res) => {
    const Animal: Animal = req.body;
    const results = await AnimalRepository.registerAnimal(Animal);
    console.log(results);
    if (results instanceof Error) {
        return res.status(500).json({ message: 'Błąd' });
    } else return res.status(201).json({});
};

export const updateAnimal=async (req, res) => {
    const updatedAnimal: Animal = req.body;

    const results = await AnimalRepository.updateAnimal(updatedAnimal);

    if (results instanceof Error) {
        return res.status(500).json({});
    } else return res.status(201).json({});
};



export const getAnimalTypes= async(req, res) => {
    const parameters: { AnimalTypeId: string | undefined } = {
        AnimalTypeId: req.query.AnimalTypeId as any,
    };
    await AnimalTypeRepository.getAnimalTypes(parameters).then((data) => {
        if (data instanceof Error) {
            return res.status(500).json({ message: 'Błąd' });
        } else return res.status(200).json(data);
    });
};


export const getIllnesses=async (req, res) => {
    const parameters = {AnimalId:req.params.AnimalId};
    // = { AnimalId: req.query.AnimalId };

    const results = await AnimalIllnessRepository.getIllnesses(parameters);
    if (results instanceof Error) {
        return res.status(500).json(results);
    } else if (results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};

export const updateIllness=async (req, res) => {
    const parameters = {
        AnimalId: req.body.AnimalId,
        Description: req.body.Description,
        VisitId: req.body.VisitId,
        RecoveryDate: req.body.RecoveryDate,
    };

    const results = await AnimalIllnessRepository.setIllnessCured(parameters);
    if (results instanceof Error) {
        return res.status(500).json({});
    } else if (results == 1) {
        return res.status(201).json({});
    }
};


export const getMedicalInfo =async (req, res) => {
 
    const AnimalId =req.params.AnimalId;
    //= req.query.AnimalId;
    console.log(AnimalId);
    const results = await AnimalMedicalInfoRepository.getAnimalMedicalInformation(AnimalId);
    if (results instanceof Error) {
        return res.status(500).json({});
    } else if (results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};

export const updateMedicalInfo=async (req, res) => {
  
    const animalMedicalInfo: AnimalMedicalInfo = req.body;
    const results = await AnimalMedicalInfoRepository.updateAnimalMedicalInfo(
        animalMedicalInfo
    );
    if (results instanceof Error) {
        return res.status(500).json({});
    } else return res.status(201).json({});
};


*/

