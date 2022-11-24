import { getCurrentUser } from "../../../other/authHelper";
import VetInfo from "./VetInfo";
import VetSchedulde from "./VetSchedulde";
import VetSpec from "./VetSpec";

function VetProfileTab(props) {
  return (
    <div className="">
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-12">
              <VetInfo vet={props.vet} />
            </div>
            <div className="col-12">
              <VetSpec types={props.types} />
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <VetSchedulde
            VetId={
              props.vetId == undefined
                ? getCurrentUser().userTypeId
                : props.vetId
            }
          />
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default VetProfileTab;
