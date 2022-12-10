
export function createVisitSearchQueryString(parameters){
    
    const Date:string|undefined = parameters.Date;
    const Email:string|undefined=parameters.Email;
    const Name:string|undefined=parameters.Name;
   
    const OwnerId:string|undefined=parameters.OwnerId;
    

     
    let queryString='';
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
        else {
            queryString=queryString+' and ';
        }
        const dateQuery=`Date='${Date}'`;
        const emailQuery=`us.Email='${Email}'`;
        const animalNameQuery=`animal.Name='${Name}'`;
        if(Date){
            queryString=queryString+ dateQuery;
        }
        if(Email){
            let andEmail='';
            if(queryString!=='Where '){
                andEmail=andEmail=' and ';
            }
            queryString=queryString+andEmail+emailQuery;
               
        }
        if(Name){
            let andName='';
            if(queryString!='Where '){
                andName=' and ';
            }
            queryString=queryString+andName+animalNameQuery;
        }

        

    }
    return queryString;
}