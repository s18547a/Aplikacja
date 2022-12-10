import express from 'express';
import ReservationController from '../controllers/ReservationContoller';

class ReservationRouter{

    router;

    constructor(reservationController:ReservationController){
        const router=express.Router();
        
        router.get('/',reservationController.getReservations);
        router.post('/',reservationController.registerReservation);

        router.delete('/:ReservationId',reservationController.deleteReservation);

        this.router=router;
    }
}

export default ReservationRouter;