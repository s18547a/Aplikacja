import { Eye, MagnetFill, Search } from "react-bootstrap-icons"

function SearchButton(props){

    return <button
    type="submit"
    className="btn btn-outline-primary bg-primary text-white d-flex align-items-center btn-sm"
   
  >
    <Search className="me-2"/>
    <a>Szukaj</a>
  </button>
}

export default SearchButton