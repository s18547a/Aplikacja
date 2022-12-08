import express from 'express';
import ReservationController from '../controllers/ReservationContoller';
const router = express.Router();
//const ReservationContoller = require('../controllers/ReservationContoller');
const reservationController=new ReservationController();

router.get('/',reservationController.getReservations);
router.post('/',reservationController.registerReservation);

router.delete('/:ReservationId',reservationController.deleteReservation);
module.exports=router;