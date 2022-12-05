import { createSurgeryAvailableHours, getBusyNextHourFromSurgery } from './createSurgeryAvailableHours';


const {createVetVisitHours} = require('../utils/hours');
const ReservationRepository =require('../repositories/ReservationRepository');

const SurgeryRepository = require('../repositories/SurgeryRepository');
export async function createVatAvailableHours(reccordset,paramters){

    const workHours= String(Object.values(reccordset)[0]);
         
    if (workHours!= null) {
        let receptionHours = createVetVisitHours(workHours);
    

        console.log(receptionHours);

        const bookedReservations =
        await ReservationRepository.getReservations({
            VetId: paramters.VetId,
            Date: paramters.Date,
            OwnerId: null,
        });

        if (bookedReservations != null) {
            let bookedHours: string[] = [];
            bookedHours = bookedReservations.map((reservation) => {
                return reservation.Hour;
            });

            receptionHours = receptionHours.filter((bookedHour) => {
                return !bookedHours.includes(bookedHour);
            });
        }

        const bookedSurgeries= await SurgeryRepository.getSurgeries({Date:paramters.Date,VetId:paramters.VetId});
        
        if( bookedSurgeries!=null){
          

            const unavalilableHoursArrays:[]=bookedSurgeries.map(surgery=>{
                return getBusyNextHourFromSurgery(surgery.StartTime);
            });
            console.log(unavalilableHoursArrays);
            let unavalilableHour:string[]=[];
            unavalilableHoursArrays.forEach(hoursArray=>{
                unavalilableHour=unavalilableHour.concat(hoursArray);

                unavalilableHour=unavalilableHour.filter((item,index)=>{
                    return (unavalilableHour.indexOf(item)==index);
                });
            });
            console.log('Unavali',unavalilableHour);
            receptionHours=receptionHours.filter((hour)=>{
                return !unavalilableHour.includes(hour);
            });
            
            console.log('Recepcion',receptionHours); 

            
        }

     
        if(paramters.isSurgery===false){
            return receptionHours;
        }
        else {
           
            console.log(receptionHours);
          
            const availableSurgeryTime= await createSurgeryAvailableHours(receptionHours);
           
            if(availableSurgeryTime.length==0){
                return null;
            }
            return availableSurgeryTime;
        }
    
    }
  
}