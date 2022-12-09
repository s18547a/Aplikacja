import express from 'express';
import SurgeryController from '../controllers/SurgeryController';
import AnimalRepostiory from '../models/repositories/AnimalRepository';
import AnimalTypeRepository from '../models/repositories/AnimalTypeRepository';
import SurgeryRepository from '../models/repositories/SurgeryRepository';
import VetRepository from '../models/repositories/VetRepository';
import VetTypeRepository from '../models/repositories/VetTypeRepository';
const router = express.Router();
const vetTypeRepository=new VetTypeRepository();
const vetRepository=new VetRepository(vetTypeRepository);
const animalTypeRepository=new AnimalTypeRepository();
const animalRepository=new AnimalRepostiory(animalTypeRepository);
const surgeryRepository=new SurgeryRepository(animalRepository,vetRepository);
const surgeryController= new SurgeryController(surgeryRepository);
router.get('/types',surgeryController.getSurgeryTypes);
router.get('/:SurgeryId', surgeryController.getSurgery);
router.get('/', surgeryController.getSurgeries);


router.post('/',surgeryController.registerSurgery);
router.put('/:SurgeryId/report',surgeryController.updateSurgeryReport);
router.delete('/:SurgeryId',surgeryController.deleteSurgery);

module.exports=router;