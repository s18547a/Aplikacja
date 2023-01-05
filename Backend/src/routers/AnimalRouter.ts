import express from 'express';
import AnimalController from '../controllers/AnimalController';


class AnimalRouter{

    router;
    constructor(animalController:AnimalController){
        
        const {isAuthorizated} = require('../middlewares/isAuthorizatied');

        const router = express.Router();
 
        router.get('/types',isAuthorizated, animalController.getAnimalTypes);
    
        router.get('/:AnimalId',isAuthorizated, animalController.getAnimal);
        
        router.get('/', isAuthorizated,animalController.getAnimals);
        
        router.post('/', isAuthorizated, animalController.registerAnimal);
        
        router.put('/', isAuthorizated,  animalController.updateAnimal);
        
        router.get('/:AnimalId/illnesses', isAuthorizated,  animalController.getIllnesses);
        
        router.put('/illnesses', isAuthorizated,  animalController.updateIllness);
        
        router.get('/:AnimalId/medicalInfo', isAuthorizated,  animalController.getMedicalInfo);
        
        router.put('/medicalInfo', isAuthorizated,  animalController.updateMedicalInfo);

        this.router=router;

    }


}

export default AnimalRouter;

