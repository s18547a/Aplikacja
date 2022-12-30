import { getBusyNextHourFromSurgery, createSurgeryAvailableHours } from '../../utils/receptionHoursHelper';
import { createVetVisitHours } from '../../utils/hours';
import Reservation from '../../models/classes/Reservation';
import Repository from './Repository';
import ReservationRepository from './ReservationRepository';
import SurgeryRepository from './SurgeryRepository';
import Surgery from '../../models/classes/Surgery';

class ScheduldeHelperRepository extends Repository{

    reservationRepository;
    surgeryRepository;
    constructor(db,reservationRepository:ReservationRepository,surgeryRepository:SurgeryRepository){
        super(db);
        this.reservationRepository=reservationRepository;
        this.surgeryRepository=surgeryRepository;
    }

    createVatAvailableHours=async (reccordset,paramters)=>{

        const workHours= String(Object.values(reccordset)[0]);
             
        if (workHours!= null) {
            let receptionHours = createVetVisitHours(workHours);
        
    
            console.log(receptionHours);
    
            const bookedReservations=
                        await this.reservationRepository.getReservations({
                            VetId: paramters.VetId,
                            Date: paramters.Date,
                            OwnerId: null,
                        }) as Reservation[]|null;
    
            if (bookedReservations != null) {
                let bookedHours: string[] = [];
                bookedHours = bookedReservations.map((reservation) => {
                    return reservation.Hour;
                });
                //usuwa z listy termniów już zajęta
                receptionHours = receptionHours.filter((bookedHour) => {
                    return !bookedHours.includes(bookedHour);
                });
            }
    
            const bookedSurgeries:Surgery[]|null= await this.surgeryRepository.getSurgeries({Date:paramters.Date,VetId:paramters.VetId });
            
            if( bookedSurgeries!=null){
              
                //stwarza listę list potrzebnych terminów dla każdego dostępnego temniów zabiegu
                const unavalilableHoursArrays:string[][]=bookedSurgeries.map(surgery=>{
                    return getBusyNextHourFromSurgery(surgery.StartTime);
                });
                
                let unavalilableHour:string[]=[];

                //na podstawie listy list tworzy listę godzin będących potrzebnych do realizacji zabiegu
                unavalilableHoursArrays.forEach(hoursArray=>{
                    unavalilableHour=unavalilableHour.concat(hoursArray);
    
                    unavalilableHour=unavalilableHour.filter((item,index)=>{
                        return (unavalilableHour.indexOf(item)==index);
                    });
                });
                //przelifrowuje listę zabiegów z listy rezerwacji
                receptionHours=receptionHours.filter((hour)=>{
                    return !unavalilableHour.includes(hour);
                });
                
                console.log('Recepcion',receptionHours); 
    
                
            }
    
            
            if(paramters.isSurgery===false){
                    
                if(receptionHours.length==0){
                    return null;
                }
                return receptionHours;
            }
            else {
               
                console.log(receptionHours);
                
              
                const availableSurgeryTime=  createSurgeryAvailableHours(receptionHours);
                console.log('availabeSurgeryHours',availableSurgeryTime);
                if(availableSurgeryTime.length==0){
                    
                    return null;
                }
                return availableSurgeryTime;
            }
        
        }
      
    };
    
}

export default ScheduldeHelperRepository;

