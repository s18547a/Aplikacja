import express, { Response } from "express";
const router = express.Router();

const VaccineController = require('../controllers/VaccineController');


router.get('/types',VaccineController.getVaccineTypes);
router.get('/:AnimalId',VaccineController.getAnimalVaccines);
router.get('/core/:AnimalId',VaccineController.getAnimalCoreVaccineTypes);

module.exports=router;
