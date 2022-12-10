

export function getBusyNextHourFromSurgery(surgeryHour){
    const [hour,minute]=surgeryHour.split(':');
          
        
  


    const nextHour=parseInt(hour)+1;
    const nextNextHour=nextHour+1;
    const nextHourString=nextHour<10?`0${new String(nextHour)}`:new String(nextHour);
    const nextNextHourString=nextNextHour<10?`0${new String(nextNextHour)}`:new String(nextNextHour);
    let onePart=surgeryHour;
    let  twoPart;
    let  threePart;
    let  fourPart;
    let  fifthPart;
    let  sixtPart;
       
    if(minute==='00'){
        onePart=surgeryHour;
        twoPart=`${hour}:20`;
        threePart=`${hour}:40`;
        fourPart=`${nextHourString}:00`;
        fifthPart=`${nextHourString}:20`;
        sixtPart=`${nextHourString}:40`;
     
    }else
    if(minute==='20'){
          
        onePart=surgeryHour;
        twoPart=`${hour}:40`;
        threePart=`${nextHourString}:00`;
        fourPart=`${nextHourString}:20`;
        fifthPart=`${nextHourString}:40`;
        sixtPart=`${nextNextHourString}:00`;
      
    }else
    if(minute==='40'){
        onePart=surgeryHour;
        twoPart=`${nextHourString}:00`;
        threePart=`${nextHourString}:20`;
        fourPart=`${nextHourString}:40`;
        fifthPart=`${nextNextHourString}:00`;
        sixtPart=`${nextNextHourString}:20`;
      
    }

        
    const   necesseryHoursArray=[onePart,twoPart,threePart,fourPart,fifthPart,sixtPart];

    return necesseryHoursArray;


}

export async function createSurgeryAvailableHours(receptionHours){

    const availableSurgeryTime= receptionHours.filter(surgeryHour=>{
        console.log(surgeryHour);
        const [hour,minute]=surgeryHour.split(':');
          
        
        const arrayToSlice=receptionHours.map(x=>x);
       
       
        const index=receptionHours.indexOf(surgeryHour);
      
        const splicedArray=arrayToSlice.splice(index,6);
 


        const nextHour=parseInt(hour)+1;
        const nextNextHour=nextHour+1;
        const nextHourString=nextHour<10?`0${new String(nextHour)}`:new String(nextHour);
        const nextNextHourString=nextNextHour<10?`0${new String(nextNextHour)}`:new String(nextNextHour);
        let onePart=surgeryHour;
        let  twoPart;
        let  threePart;
        let  fourPart;
        let  fifthPart;
        let  sixtPart;
           
        if(minute==='00'){
            onePart=surgeryHour;
            twoPart=`${hour}:20`;
            threePart=`${hour}:40`;
            fourPart=`${nextHourString}:00`;
            fifthPart=`${nextHourString}:20`;
            sixtPart=`${nextHourString}:40`;
         
        }else
        if(minute==='20'){
              
            onePart=surgeryHour;
            twoPart=`${hour}:40`;
            threePart=`${nextHourString}:00`;
            fourPart=`${nextHourString}:20`;
            fifthPart=`${nextHourString}:40`;
            sixtPart=`${nextNextHourString}:00`;
          
        }else
        if(minute==='40'){
            onePart=surgeryHour;
            twoPart=`${nextHourString}:00`;
            threePart=`${nextHourString}:20`;
            fourPart=`${nextHourString}:40`;
            fifthPart=`${nextNextHourString}:00`;
            sixtPart=`${nextNextHourString}:20`;
          
        }

            
        const   necesseryHoursArray=[onePart,twoPart,threePart,fourPart,fifthPart,sixtPart];

        const equals = JSON.stringify(necesseryHoursArray)===JSON.stringify(splicedArray);
        console.log(necesseryHoursArray);
        console.log(splicedArray);
        console.log(equals);
        return equals;
              
              
    

    });

    return availableSurgeryTime;
}