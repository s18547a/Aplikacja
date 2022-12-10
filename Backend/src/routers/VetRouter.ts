import express from 'express';
import VetController from '../controllers/VetController';
import VetRepository from '../models/repositories/VetRepository';
import VetScheduldeRepository from '../models/repositories/VetScheduldeRepository';
import VetTypeRepository from '../models/repositories/VetTypeRepository';
const router = express.Router();
//const VetController = require('../controllers/VetController');

const vetTypeRepository=new VetTypeRepository();

const vetScheduldeRepository=new VetScheduldeRepository();
const vetRepository=new VetRepository(vetTypeRepository,vetScheduldeRepository);
const vetController=new VetController(vetRepository,vetTypeRepository,vetScheduldeRepository);

router.get('/types',vetController.getVetTypes);
router.get('/:VetId',vetController.getVet);
router.get('/',vetController.getVets);
router.post('/',vetController.registerVet);
router.get('/schedulde/availableHours',vetController.getAvailableHours);
router.get('/:VetId/schedulde',vetController.getVetSchedulde);
router.get('/:VetId/daysOfWeek',vetController.getVetDaysOfWeek);
router.put('/schedulde', vetController.updateSchedulde);
router.put('/',vetController.updateVet);
module.exports=router;