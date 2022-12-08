import express from 'express';
import VaccineController from '../controllers/VaccineController';
const router = express.Router();

//const VaccineController = require('../controllers/VaccineController');
const vaccineController=new VaccineController();

router.get('/types',vaccineController.getVaccineTypes);
router.get('/:AnimalId',vaccineController.getAnimalVaccines);
router.get('/core/:AnimalId',vaccineController.getAnimalCoreVaccineTypes);

module.exports=router;
