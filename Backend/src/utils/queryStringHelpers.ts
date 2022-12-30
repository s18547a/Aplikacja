
export function createVisitSearchQueryString(parameters):string{
    
    const Date:string|undefined = parameters.Date;
    const Email:string|undefined=parameters.Email;
    const Name:string|undefined=parameters.Name;
   
    const OwnerId:string|undefined=parameters.OwnerId;
    

     
    let queryString:string='';
    if(OwnerId){
        queryString=`Where animal.OwnerId='${OwnerId}'`;
    }
    
    if(!Date&&!Email&&!Name)
    {
        queryString=queryString+' '; 
    }
    else {
        if(!OwnerId){
            queryString='Where ';
        }
       
      
        if(Date){
            if(OwnerId){
                queryString=queryString+' and ';
            }

            queryString=queryString+ `Date='${Date}'`;
        }
        if(Email){
            let andEmail='';
            if(queryString!=='Where '){
                andEmail=andEmail=' and ';
            }
            queryString=queryString+andEmail+`us.Email='${Email}'`;
               
        }
        if(Name){
            let andName='';
            if(queryString!='Where '){
                andName=' and ';
            }
            queryString=queryString+andName+`animal.Name='${Name}'`;
        }

        

    }
    return queryString;
}