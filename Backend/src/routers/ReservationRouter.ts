import express, { Response } from "express";
const router = express.Router();
const ReservationContoller = require('../controllers/ReservationContoller');
router.get('/',ReservationContoller.getReservations);
router.post('/',ReservationContoller.registerReservation);

router.delete('/:ReservationId',ReservationContoller.deleteReservation);
module.exports=router;