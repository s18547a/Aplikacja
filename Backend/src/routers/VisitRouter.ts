import express from 'express';
import VisitController from '../controllers/VisitController';
import AnimalRepostiory from '../models/repositories/AnimalRepository';
import AnimalTypeRepository from '../models/repositories/AnimalTypeRepository';
import MedicalActivityRepository from '../models/repositories/MedicalActivityRepository';
import OwnerRepository from '../models/repositories/OwnerRepository';
import ReservationRepository from '../models/repositories/ReservationRepository';
import VetRepository from '../models/repositories/VetRepository';
import VetScheduldeRepository from '../models/repositories/VetScheduldeRepository';
import VetTypeRepository from '../models/repositories/VetTypeRepository';
import VisitRepository from '../models/repositories/VisitRepository';
const router = express.Router();
//const VisitController=require('../controllers/VisitController');
const animalTypeRepository=new AnimalTypeRepository();
const animalRepository=new AnimalRepostiory(animalTypeRepository);
const vetTypeRepository=new VetTypeRepository();
const vetScheduldeRepository=new VetScheduldeRepository();
const vetRepository=new VetRepository(vetTypeRepository,vetScheduldeRepository);
const medicalActivityRepository=new MedicalActivityRepository();
const ownerRepository=new OwnerRepository();
const reservationRepository=new ReservationRepository(ownerRepository,vetRepository);
const visitRepository=new VisitRepository(animalRepository,vetRepository,medicalActivityRepository,reservationRepository);

const visitController=new VisitController(visitRepository,medicalActivityRepository);
router.get('/activities',visitController.getVisitActivities);
router.get('/search',visitController.searchVisits);
router.get('/:VisitId',visitController.getVisit);

router.get('/', visitController.getVisits);
router.post('/',visitController.registerVisit);

module.exports=router;