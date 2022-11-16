import { getDefalutProfileImage } from "../../../other/imageHelper";

function ReservationVetChoice(props) {
  function handleVetChange(e) {
    props.handleVetChange(e);
  }

  return (
    <div className="">
      <div className="form-group">
        <div className="form-label">Weterynarz</div>

        <div className="list-group">
          {props.vets.map((vet) => {
            return (
              <button
                name={"VetId"}
                value={vet.VetId}
                className={
                  props.reservation.VetId == vet.VetId
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
    </div>
  );
}

export default ReservationVetChoice;
