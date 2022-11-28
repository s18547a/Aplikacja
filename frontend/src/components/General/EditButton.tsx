import { Gear } from "react-bootstrap-icons"



function EditButton({onClick}){
console.log("HEE")
    

    return <button className="btn btn-info btn-sm text-white d-flex align-items-center" onClick={onClick}>
        <Gear className="me-2"/>
        <a>Edytuj</a>
      
        </button>


}

export default EditButton