import Animal from '../classes/Animal';
import { AnimalParametersType } from '../classes/Interfaces';
import AnimalMedicalInfo from '../classes/AnimalMedicalInfo';
const AnimalRepository = require('../repositories/AnimalRepository.ts');
const AnimalTypeRepository = require('../repositories/AnimalTypeRepository');
const AnimalMedicalInfoRepository=require('../repositories/AnimalMedicalInfoRepository');
const AnimalIllnessRepository=require('../repositories/AnimalIllnessRepository');


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




