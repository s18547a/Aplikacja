import { getCurrentUser } from "../../../../components/other/authHelper";
import ProfileDiv from "../../../../components/other/ProfileDiv";
import { getDefalutProfileImage } from "../../../other/imageHelper";

function VetInfo(props) {
  return (
    <div className="card card-body border-0 shadow">
      <div className="row align-items-center">
        <div className="col-lg-4 ">
          <div className="row justify-content-center">
            <div className="col-6">
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

        <div className="col-lg-8 ">
          <div className="row justify-content-center">
            <div className="col-9">
              <ProfileDiv label={"Imie"} value={props.vet.Name} />
              <ProfileDiv label={"Nazwisko"} value={props.vet.LastName} />
              <ProfileDiv label={"Kontakt"} value={props.vet.Contact} />
              <ProfileDiv label={"Email"} value={getCurrentUser().Email} />
              <ProfileDiv label={"Zatrudniono"} value={props.vet.HireDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetInfo;
