import { useState } from "react"

import FormSearchDateDiv from "../../Form/FormSearchDateDiv"
import FormSearchDiv from "../../Form/FormSearchDiv"
import SearchButton from "../../General/SearchButton"

import { VisitListParamter } from "../../other/helperClass/VisitListParameters"


function VisitSearch(props){

    const [searchParameters,setSearchParamteters]=useState({
        Name:"",
        Email:"",
        Date:'',
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
        const visitListParametersInstance = new VisitListParamter();
        visitListParametersInstance.setEmail(searchParameters.Email);
        visitListParametersInstance.setDate(searchParameters.Date);
        visitListParametersInstance.setName(searchParameters.Name);
        props.onSearch(visitListParametersInstance);
        setSearchParamteters(()=>({
            Name:"",
            Email:"",
            Date:'',
        }))

    }

    return <form className=" card card-body shadow" onSubmit={onSearch}>
       
            <div className=" row justify-content-center">
                <div className="col-auto">
                     
            <FormSearchDiv label={"Zwierzę"} name={"Name"} onChange={onChange} value={searchParameters.Name}/>
             </div> 
             <div className="col-auto">
             <FormSearchDiv label={"Weterynarz"} name={"Email"} onChange={onChange} value={searchParameters.Email}/>
             </div>
             <div className="col-auto">
                <FormSearchDateDiv  value={searchParameters.Date} name="Date" onChange={onChange} label={"Data"}  error=""   dateFormat="yyyy-MM-dd" locale={"pl"}/>
             </div>
             <div className="col-auto">
             <SearchButton/>
          

            </div>

        </div>

    </form>

}

export default VisitSearch