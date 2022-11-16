
const dateHelper=require('../helpers/dateHelper');

const sql = require("mssql");
const hoursHelper = require("../helpers/hours");
const ReservationRepository =require('../repositories/ReservationRepository');

const SurgeryRepository = require('../repositories/SurgeryRepository')
export async function createVatAvailableHours(reccordset,paramters){

    const workHours= Object.values(reccordset)[0];
         
    if (workHours!= null) {
      let receptionHours = hoursHelper.createVetVisitHours(workHours);
    

 

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

      const bookedSurgeries= await SurgeryRepository.getSurgeries({Date:paramters.Date,VetId:paramters.VetId})

        if( bookedSurgeries!=null){

           let bookedSurgeriesHour:string[]=bookedSurgeries.map(surgery=>{
              return surgery.StartTime;
            })

         

            receptionHours=receptionHours.filter((bookedHour)=>{
             
            const hour=bookedHour.split(':')[0];
            let isHourReserved=false;
            bookedSurgeriesHour.forEach(bookedSurgery=>{
                     hour=== bookedSurgery.split(':')[0]||hour===String(parseInt(bookedSurgery.split(':')[0])+1)?isHourReserved=true:isHourReserved=false
            })
            
              if(isHourReserved){
                return false
              } else return true;
            })
          
        }

     
      if(paramters.isSurgery===false){
        return receptionHours;
      }
      else {
           
           
          
           const availableSurgeryTime= receptionHours.filter(surgeryHour=>{
            console.log(surgeryHour)
                const [hour,minute]=surgeryHour.split(':');
                  
                
                const arrayToSlice=receptionHours.map(x=>x);
               
               
                const index=receptionHours.indexOf(surgeryHour);
              
                const splicedArray=arrayToSlice.splice(index,6);
         


                      const nextHour=parseInt(hour)+1;
                      const nextNextHour=nextHour+1;
                      const nextHourString=nextHour<10?`0${new String(nextHour)}`:new String(nextHour)
                      const nextNextHourString=nextNextHour<10?`0${new String(nextNextHour)}`:new String(nextNextHour)
                      let onePart=surgeryHour;
                      let  twoPart
                      let  threePart
                      let  fourPart
                      let  fifthPart
                      let  sixtPart
                   
                      if(minute==="00"){
                       onePart=surgeryHour;
                       twoPart=`${hour}:20`
                       threePart=`${hour}:40`
                       fourPart=`${nextHourString}:00`
                       fifthPart=`${nextHourString}:20`
                       sixtPart=`${nextHourString}:40`
                 
                      }else
                      if(minute==="20"){
                      
                        onePart=surgeryHour;
                        twoPart=`${hour}:40`
                        threePart=`${nextHourString}:00`
                        fourPart=`${nextHourString}:20`
                        fifthPart=`${nextHourString}:40`
                        sixtPart=`${nextNextHourString}:00`
                  
                      }else
                      if(minute==="40"){
                        onePart=surgeryHour;
                        twoPart=`${nextHourString}:00`
                        threePart=`${nextHourString}:20`
                        fourPart=`${nextHourString}:40`
                        fifthPart=`${nextNextHourString}:00`
                        sixtPart=`${nextNextHourString}:20`
                  
                      }

                    
                      const   necesseryHoursArray=[onePart,twoPart,threePart,fourPart,fifthPart,sixtPart];

                      const equals = JSON.stringify(necesseryHoursArray)===JSON.stringify(splicedArray);
                      console.log(necesseryHoursArray)
                      console.log(splicedArray)
                      console.log(equals)
                     return equals
                      
                      
            

            })

            if(availableSurgeryTime.length==0){
              return null
            }
            return availableSurgeryTime;
      }
    
    }
  
}