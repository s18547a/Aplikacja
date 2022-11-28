import { getDefalutProfileImage } from "../../other/imageHelper";

function VetChoiceComponent(props) {
  function handleVetChange(e) {
    e.preventDefault();
    props.onChange(e);
  }

  return (
    <div className="form-group">
      <div className="form-label card card-body shadow">{props.label}</div>
      <div className="">
        {props.vets.map((vet) => {
          return (
            <button
              name={"VetId"}
              value={vet.VetId}
              className={
                props.selected == vet.VetId
                  ? " card card-body active stretched-link bg-primary"
                  : "card card-body stretched-link"
              }
              onClick={handleVetChange}
            >
              <div className="row">
                <div className="col-6">
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
                <div className="col-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="">{vet.Name + " " + vet.LastName}</div>
                    </div>
                    <div className="col-12">
                      <div className="">{vet.Contact}</div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default VetChoiceComponent;
