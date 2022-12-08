import { useState } from "react";
import FormSearchDateDiv from "../../../Form/FormSearchDateDiv";
import FormSearchDiv from "../../../Form/FormSearchDiv";
import SearchButton from "../../../General/SearchButton";
import { VisitListParamter } from "../../../other/helperClass/VisitListParameters";

function AnimalSearch(props){
    const [searchParameters,setSearchParamteters]=useState({
       Email:"",
      
    }
   )

    function onChange(e){
        console.log(e);
        const {name,value}=e.target;
       
            setSearchParamteters((prev)=>({
                ...prev,
                [name]:value
            }))


    }

    function onSearch(e){
         e.preventDefault();
      
        props.onSearch(searchParameters.Email);
        setSearchParamteters(()=>({
           
            Email:"",
            
        }))

    }

    return <form className=" card card-body shadow" onSubmit={onSearch}>
       
            <div className=" row justify-content-center">
                <div className="col-auto">
                     
            <FormSearchDiv label={"Email właściciela"} name={"Email"} onChange={onChange} value={searchParameters.Email}/>
             </div> 
            
             
             <div className="col-auto">
             <SearchButton/>
          

            </div>

        </div>

    </form>

}

export default AnimalSearch