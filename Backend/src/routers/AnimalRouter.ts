import express from 'express';
import AnimalController from '../controllers/AnimalController';


class AnimalRouter{

    router;
    constructor(animalController:AnimalController){
        
        const {isAuthorizated} = require('../middlewares/isAuthorizatied');

        const router = express.Router();
 
        router.get('/types', animalController.getAnimalTypes);
    
        router.get('/:AnimalId', animalController.getAnimal);
        
        router.get('/', animalController.getAnimals);
        
        router.post('/', isAuthorizated, animalController.registerAnimal);
        
        router.put('/', isAuthorizated,  animalController.updateAnimal);
        
        router.get('/:AnimalId/illnesses',  animalController.getIllnesses);
        
        router.put('/illnesses',  animalController.updateIllness);
        
        router.get('/:AnimalId/medicalInfo',  animalController.getMedicalInfo);
        
        router.put('/medicalInfo',  animalController.updateMedicalInfo);

        this.router=router;

    }


}

export default AnimalRouter;

