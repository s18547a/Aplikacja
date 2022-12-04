import express from 'express';
const router = express.Router();
const AnimalController=require('../controllers/AnimalController.ts');

const {isAuthorizated} = require('../middlewares/isAuthorizatied');
router.get('/types', AnimalController.getAnimalTypes);
router.get('/:AnimalId', AnimalController.getAnimal);
router.get('/', AnimalController.getAnimals);
router.post('/', isAuthorizated,AnimalController.registerAnimal);
router.put('/', isAuthorizated, AnimalController.updateAnimal);
router.get('/:AnimalId/illnesses', AnimalController.getIllnesses);
router.put('/illnesses', AnimalController.updateIllness);
router.get('/:AnimalId/medicalInfo', AnimalController.getMedicalInfo);
router.put('/medicalInfo', AnimalController.updateMedicalInfo);
module.exports=router;
