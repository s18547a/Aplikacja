import express from 'express';
import AnimalController from '../controllers/AnimalController';
import AnimalIllnessRepository from '../models/repositories/AnimalIllnessRepository';
import AnimalMedicalInfoRepository from '../models/repositories/AnimalMedicalInfoRepository';
import AnimalRepostiory from '../models/repositories/AnimalRepository';
import AnimalTypeRepository from '../models/repositories/AnimalTypeRepository';

const router = express.Router();
//const AnimalController=require('../controllers/AnimalController.ts');

const {isAuthorizated} = require('../middlewares/isAuthorizatied');

const animalTypeRepository=new AnimalTypeRepository();
const animalRepository=new AnimalRepostiory(animalTypeRepository);

const animalMedicalInfoRepository=new AnimalMedicalInfoRepository();
const animalIllnessRepository=new AnimalIllnessRepository();
   
const animalController=new AnimalController(animalRepository,animalTypeRepository,animalMedicalInfoRepository,animalIllnessRepository);
   
    
    
router.get('/types', animalController.getAnimalTypes);
    
router.get('/:AnimalId', animalController.getAnimal);
    
router.get('/', animalController.getAnimals);
    
router.post('/', isAuthorizated, animalController.registerAnimal);
    
router.put('/', isAuthorizated,  animalController.updateAnimal);
    
router.get('/:AnimalId/illnesses',  animalController.getIllnesses);
    
router.put('/illnesses',  animalController.updateIllness);
    
router.get('/:AnimalId/medicalInfo',  animalController.getMedicalInfo);
    
router.put('/medicalInfo',  animalController.updateMedicalInfo);
 




module.exports=router;

