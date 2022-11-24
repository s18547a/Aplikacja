import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../../components/other/authHelper";
import ProfileDiv from "../../../../components/other/ProfileDiv";
import { getDefalutProfileImage } from "../../../other/imageHelper";

function VetInfo(props) {
  const navigate = useNavigate();
  return (
    <div className="">
      
      
      
      <div className="row align-items-center">
        <div className="col-lg-4 ">
          <div className="row ">
            <div className="col-12 card card-body border-0 shadow p-4 ">
              
                <img
                height="250px"
                width="250px"
                className=""
                src={
                  props.vet.ProfileImage == null
                    ? getDefalutProfileImage()
                    : props.vet.ProfileImage
                }
              />

               
            
            </div>
          </div>
        </div>

        <div className="ms-3 col-lg-7  ">
          <div className="row card card-body shadow ">
            <div className="col-12">
            <div className="row mb-3">
              <div className="col-3"><div className="card-title"><h5>Główne informacje</h5></div></div>
              <div className="col-3">
            <button className="btn btn-primary btn-sm" onClick={() =>
                        navigate(`/vets/${props.vet?.VetId}/edit`, {
                          state: { VetId: props.vet?.VetId },
                        })
                      }>Edytuj</button>
              

            </div>
      </div>
          <div className="row justify-content-center">
            <div className="col-12">
              <ProfileDiv label={"Imie"} value={props.vet.Name} />
              <ProfileDiv label={"Nazwisko"} value={props.vet.LastName} />
              <ProfileDiv label={"Kontakt"} value={props.vet.Contact} />
              <ProfileDiv label={"Email"} value={props.vet.Email} />
              <ProfileDiv label={"Zatrudniono"} value={props.vet.HireDate} />
            </div>
          </div>

            </div>

         
     
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetInfo;
