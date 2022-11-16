import { getDefalutProfileImage } from "../../other/imageHelper";

function VetChoiceComponent(props) {
  function handleVetChange(e) {
    e.preventDefault();
    props.onChange(e);
  }

  return (
    <div className="form-group">
      <div className="form-label">{props.label}</div>
      <div className="list-group">
        {props.vets.map((vet) => {
          return (
            <button
              name={"VetId"}
              value={vet.VetId}
              className={
                props.selected == vet.VetId
                  ? "list-group-item active stretched-link"
                  : "list-group-item stretched-link"
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
