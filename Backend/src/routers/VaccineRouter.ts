import express from 'express';
import VaccineController from '../controllers/VaccineController';
import VaccineRepository from '../models/repositories/VaccineRepository';
const router = express.Router();

//const VaccineController = require('../controllers/VaccineController');
const vaccineRepository=new VaccineRepository();
const vaccineController=new VaccineController(vaccineRepository);

router.get('/types',vaccineController.getVaccineTypes);
router.get('/:AnimalId',vaccineController.getAnimalVaccines);
router.get('/core/:AnimalId',vaccineController.getAnimalCoreVaccineTypes);

module.exports=router;
