import express, { Response } from "express";
const router = express.Router();
const AnimalController=require("../controllers/AnimalController.ts");

router.get('/types',AnimalController.getAnimalTypes);
router.get('/:AnimalId',AnimalController.getAnimal);
router.get('/',AnimalController.getAnimals);

router.post('/',AnimalController.registerAnimal);
router.put('/',AnimalController.updateAnimal);


router.get('/:AnimalId/illnesses', AnimalController.getIllnesses);
router.put('/illnesses',AnimalController.updateIllness);

router.get('/:AnimalId/medicalInfo',AnimalController.getMedicalInfo);
router.put('/medicalInfo',AnimalController.updateMedicalInfo);

module.exports=router;