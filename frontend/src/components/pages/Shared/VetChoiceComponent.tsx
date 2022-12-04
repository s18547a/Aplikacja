import { getDefalutProfileImage } from "../../other/imageHelper";

function VetChoiceComponent(props) {
  function handleVetChange(e) {
    e.preventDefault();
    props.onChange(e);
  }

  return (
    <div className="form-group">
      <div className="form-label fw-bold">{props.label}</div>
      <div className="list-group">
      <div className="row ">
        {props.vets.map((vet) => {
          return (
            <div className="col-6">
            <button
              name={"VetId"}
              value={vet.VetId}
              className={
                props.selected == vet.VetId
                  ? "  list-group-item active stretched-link bg-primary  m-2 border-1"
                  : " list-group-item stretched-link  m-2 border-1"
              }
              onClick={handleVetChange}
            >
              <div className="row p-3">
                <div className="col-12">
                  <img
                    width={"100px"}
                    height={"100px"}
                    src={
                      vet.ProfileImage == null
                        ? getDefalutProfileImage()
                        : vet.ProfileImage
                    }
                  />
                </div>
                </div>
                <div className="row">
                <div className="col-12 ">
                <div className="d-flex flex-column">
                    <div className=" p-3">{vet.Name + " " + vet.LastName}</div>
                     
                     
                     <div className="">{`tel. ${vet.Contact}`}</div>
                    </div>
                  </div>
                </div>
             
            </button>
            
            </div>
            
          );
        })}
      </div>
      </div>
    </div>
  );
}
export default VetChoiceComponent;
