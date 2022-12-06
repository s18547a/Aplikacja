import { getCurrentUser } from "../authHelper";
import { isOwner } from "../userType";

export class VisitListParamter{

    Email:string='';
    OwnerId:string='';
    Name:string='';
    Date:string='';
    
  
    constructor(){
        this.OwnerId=isOwner()?getCurrentUser().userTypeId:'';
  
    }
    setEmail(Email:string){
        this.Email=Email;
    }
    setName(Name:string){
        this.Name=Name;
    }
    setDate(Date:string){
        this.Date=Date;
    }

    allUndefined():boolean{
        if(this.Email||this.Date||this.Name){
            return true
        }
        return false;
    }

    createURLString():string{
        const urlString=`?OwnerId=${this.OwnerId}&Email=${this.Email}&Name=${this.Name}&Date=${this.Date}`;
       
        return urlString;
    }
  }