import express from 'express';
import ReservationController from '../controllers/ReservationContoller';
import OwnerRepository from '../models/repositories/OwnerRepository';
import ReservationRepository from '../models/repositories/ReservationRepository';
import VetRepository from '../models/repositories/VetRepository';
import VetTypeRepository from '../models/repositories/VetTypeRepository';
const router = express.Router();
//const ReservationContoller = require('../controllers/ReservationContoller');
const ownerRepository=new OwnerRepository();
const vetTypeRepository=new VetTypeRepository();
const vetRepository=new VetRepository(vetTypeRepository);
const reservationRepository=new ReservationRepository(ownerRepository,vetRepository);
const reservationController=new ReservationController(reservationRepository);

router.get('/',reservationController.getReservations);
router.post('/',reservationController.registerReservation);

router.delete('/:ReservationId',reservationController.deleteReservation);
module.exports=router;