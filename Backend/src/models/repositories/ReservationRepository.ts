

import sql from 'mssql';
import { GetReservationParameters } from '../classes/Interfaces';

import Reservation from '../classes/Reservation';
import Vet from '../classes/Vet';
import { createIDwithUUIDV4 } from '../../utils/idHelpers';
import OwnerRepository from './OwnerRepository';
import Repository from './Repository';
import { createVetVisitHours } from '../../utils/hours';
import { getBusyNextHourFromSurgery, createSurgeryAvailableHours } from '../../utils/createSurgeryAvailableHours';
import SurgeryRepository from './SurgeryRepository';



class ReservationRepository extends Repository{

    ownerRepository;
    vetRepository;
    
    constructor(db,ownerRepository:OwnerRepository,vetRepository){
        super(db);
        this.ownerRepository=ownerRepository;
        this.vetRepository=vetRepository;
        
    }

    getReservations = async (parameters: GetReservationParameters) => {
        try {
            const returnList = true;
    
            const pool = await sql.connect(this.databaseConfiguration);
            let reservationRecordset;
            if (!parameters.VetId && !parameters.Date && !parameters.OwnerId) {
                const reservationPool = await pool
                    .request()
                    .query('Select * From Reservation Order by Date,Hour');
                reservationRecordset = reservationPool.recordset;
                console.log(reservationRecordset);
            } else if (parameters.VetId && parameters.Date) {
                const reservationPool = await pool
                    .request()
                    .input('VetId', sql.VarChar, parameters.VetId)
                    .input('Date', sql.Date, parameters.Date)
                    .query(
                        'Select * From Reservation Where VetId=@VetId and Date=@Date Order by Date,Hour'
                    );
                reservationRecordset = reservationPool.recordset;
            } else if (parameters.VetId && !parameters.Date && !parameters.OwnerId) {
                const reservationPool = await pool
                    .request()
                    .input('VetId', sql.VarChar, parameters.VetId)
                    .query(
                        'Select * From Reservation  Where VetId=@VetId Order by Date,Hour'
                    );
                reservationRecordset = reservationPool.recordset;
            } else if (parameters.Date && !parameters.VetId && !parameters.OwnerId) {
                const reservationPool = await pool
                    .request()
                    .input('Date', sql.Int, parameters.Date)
                    .query(
                        'Select * From Reservation  Where Date=@Date Order by Date,Hour'
                    );
                reservationRecordset = reservationPool.recordset;
            } else if (parameters.OwnerId && !parameters.VetId && !parameters.Date) {
                const reservationPool = await pool
                    .request()
                    .input('OwnerId', sql.VarChar, parameters.OwnerId)
                    .query(
                        'Select * From Reservation Where OwnerId=@OwnerId Order by Date,Hour'
                    );
                reservationRecordset = reservationPool.recordset;
            }
    
            let isEmpty;
            reservationRecordset[0] == undefined ? (isEmpty = true) : (isEmpty = false);
            if (isEmpty) {
                return null;
            } else {
              
                const reservations: Reservation[] = await Promise.all(
                    reservationRecordset.map(async (reservation) => {
                        const vetObject: Vet = await this.vetRepository.getVet(
                            reservation.VetId,
                        );
                        const ownerObject = await this.ownerRepository.getOwner(
                            reservation.OwnerId,
                        );
                        return new Reservation(
                            reservation.ReservationId,
                            reservation.Date.toISOString().split('T')[0],
                            reservation.VetId,
                            reservation.OwnerId,
                            reservation.Hour,
                            vetObject,
                            ownerObject
                        );
                    })
                );
                 
                if(reservations.length==0){
                    return null;
                }
          
                if (reservations.length == 1 && !returnList) {
          
                    return reservations[0];
                } else {
          
                    return reservations;
                }
            }
        } catch (error) {
            return error;
        }
    };
    
    createReservation = async (Reservation: Reservation) => {
        try {
            const ReservationId = createIDwithUUIDV4();
            const Date: string = Reservation.Date;
            const VetId: string = Reservation.VetId;
            const OwnerId: string = Reservation.OwnerId;
            const Hour: string = Reservation.Hour;
      
    
            const pool = await sql.connect(this.databaseConfiguration);
    
            const reservationPool = await pool
                .request()
                .input('ReservationId', sql.VarChar, ReservationId)
                .input('Date', sql.Date, Date)
                .input('VetId', sql.VarChar, VetId)
                .input('OwnerId', sql.VarChar, OwnerId)
                .input('Hour', sql.VarChar, Hour)
                .query(
                    'INSERT INTO RESERVATION(ReservationId,Date,VetId,OwnerId,Hour) values(@ReservationId, @Date, @VetId, @OwnerId, @Hour)'
                );
      
    
            if (reservationPool.rowsAffected[0] == 1) {
                console.log('NEW ID' + ReservationId);
                return ReservationId;
            } else throw Error();
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    
    cancelReservation = async (ReservationId: string,transaction) => {
        try {
    
            const pool = await sql.connect(this.databaseConfiguration);
            let rowsAffected: number; 
            if(transaction==null){
                const reservationPool = await pool
                    .request()
                    .input('ReservationId', sql.VarChar, ReservationId)
                    .query('Delete From Reservation Where ReservationId=@ReservationId');
                rowsAffected = reservationPool.rowsAffected[0];
            }
            else {
                const result= await new sql.Request(transaction).
                    input('ReservationId', sql.VarChar, ReservationId)
                    .query('Delete From Reservation Where ReservationId=@ReservationId');
                rowsAffected = result.rowsAffected[0];
            }
            if(rowsAffected!=1){
                throw Error('');
            }
            else return ReservationId;
    
    
        
    
       
           
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    
    

   
}
export default ReservationRepository;
