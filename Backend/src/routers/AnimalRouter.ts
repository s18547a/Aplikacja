import express from 'express';
import AnimalController from '../controllers/AnimalController';
const router = express.Router();
//const AnimalController=require('../controllers/AnimalController.ts');

const {isAuthorizated} = require('../middlewares/isAuthorizatied');



   
const animalController=new AnimalController();
   
    
    
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

