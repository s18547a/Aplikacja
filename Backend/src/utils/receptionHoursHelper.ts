

export function getBusyNextHourFromSurgery(surgeryHour){
   
   //Godzina 
    const [hour,minute]=surgeryHour.split(':');
    const nextHour:number=parseInt(hour)+1;
    const nextNextHour:number=nextHour+1;
    const nextHourString:string=nextHour<10?`0${String(nextHour)}`:String(nextHour);
    const nextNextHourString:string=nextNextHour<10?`0${String(nextNextHour)}`:String(nextNextHour);
   
    //create next necessery reservation times 
    let  onePart:string=surgeryHour;
    let  twoPart:string="";
    let  threePart:string="";
    let  fourPart:string="";
    let  fifthPart:string="";
    let  sixtPart:string="";
       
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

        
    const   necesseryHoursArray:string[]=[onePart,twoPart,threePart,fourPart,fifthPart,sixtPart];

    return necesseryHoursArray;


}

export  function createSurgeryAvailableHours(receptionHours):string[]{
    console.log("IM HERE")
    //Sprawdza czy kolejne 5 terminów przyjęć jest wolna, aby rezerwacja zabiegu była możliwa
    const availableSurgeryTime= receptionHours.filter(surgeryHour=>{
        console.log(surgeryHour);
       
        //cut from available hours
           
        const arrayToSlice:string[]=receptionHours.map(x=>x);
       
        const index:number=receptionHours.indexOf(surgeryHour);
      
        //stwórz tablice z 6 kolejnych dostępnych terminów
        const splicedArray:string[]=arrayToSlice.splice(index,6);
    
        //tworzy listę potrzebych terminów 
        const necesseryHoursArray:string[]=getBusyNextHourFromSurgery(surgeryHour);
        
        //porównuje listę terminów oraz aktualną listę terminów
        const equals:boolean = JSON.stringify(necesseryHoursArray)===JSON.stringify(splicedArray);
       
        return equals;
              
              
    

    });

    return availableSurgeryTime;
}