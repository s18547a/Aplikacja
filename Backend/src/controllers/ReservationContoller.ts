import { GetReservationParameters } from '../dtos/dto';
import Reservation from '../models/classes/Reservation';
import ReservationRepository from '../services/repositories/ReservationRepository';

//const ReservationRepositoy = require('../models/repositories/ReservationRepository');


class ReservationController{

    reservationRepository:ReservationRepository;

    constructor(reservationRepository:ReservationRepository){
        this.reservationRepository=reservationRepository;
    }

    
    getReservations=async(req, res)=>{
        const parameters: GetReservationParameters = {
            VetId: req.query.VetId as any,
            Date: req.query.Date as any,
            OwnerId: req.query.OwnerId as any,
        };
        const results = await this.reservationRepository.getReservations(parameters);

        if (results instanceof Error) {
            return res.status(500).json({});
        }
        if (!results || results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    } ;

    registerReservation=async(req, res)=>{
        const reservation: Reservation = req.body;

        const results = await this.reservationRepository.createReservation(reservation);

        if (results instanceof Error) {
            return res.status(500).json({ message: results });
        } else {
            console.log(results);
            return res.status(201).json({ newId: results });
        }
    };

    deleteReservation=async(req, res)=>{
        const ReservationId: string = req.params.ReservationId as any;

        const results = await this.reservationRepository.cancelReservation(ReservationId,null);

        if (results instanceof Error) {
            return res.status(500).json({ message: results });
        } else
    
            return res.status(201).json({deletedId:results});
    
    };


}
export default ReservationController;
/*
export const getReservations=async (req, res) => {
    const parameters: GetReservationParameters = {
        VetId: req.query.VetId as any,
        Date: req.query.Date as any,
        OwnerId: req.query.OwnerId as any,
    };
    const results = await ReservationRepositoy.getReservations(parameters);

    if (results instanceof Error) {
        return res.status(500).json({});
    }
    if (!results || results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
} ;

export const registerReservation=async (req, res) => {
    const reservation: Reservation = req.body;

    const results = await ReservationRepositoy.createReservation(reservation);

    if (results instanceof Error) {
        return res.status(500).json({ message: results });
    } else {
        console.log(results);
        return res.status(201).json({ newId: results });
    }
};
export const deleteReservation= async (req, res) => {
    const ReservationId: number = req.params.ReservationId as any;
    const results = await ReservationRepositoy.cancelReservation(ReservationId,null);

    if (results instanceof Error) {
        return res.status(500).json({ message: results });
    } else
    
        return res.status(201).json({deletedId:results});
    
};

*/