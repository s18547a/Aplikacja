import { useNavigate } from "react-router-dom";
import ProfileDiv from "../../../../components/other/ProfileDiv";
import { getDefalutProfileImage } from "../../../other/imageHelper";

function AnimalProfile(props) {
  const navigate = useNavigate();

  return (
    <div className="card card-body border-0">
      <div className="row ">
        <div className="col-12 ">
          <div className="row">
            <div className="col-1 offset-6 mb-3">
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  navigate(`/animals/${props.animal?.AnimalId}/edit`, {
                    state: { AnimalId: props.animal?.AnimalId },
                  })
                }
              >
                Edytuj
              </button>
            </div>
          </div>
        </div>

        <div className="row ">
          <div className="col-lg-6 col-12">
            <div className="row ">
              <div className="col-12 text-center">
                <img
                  height="400px"
                  width="400px"
                  src={
                    props.animal?.ProfileImage == null
                      ? getDefalutProfileImage()
                      : props.animal.ProfileImage
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 justify-content-center">
            <div className="row">
              <div className="col-12">
                <div className="row justify-content-center">
                  <div className="col-lg-12 col-10">
                    <div className="card-title">
                      <h5>Informacje główne</h5>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <ProfileDiv label={"Imie"} value={props.animal?.Name} />
                      </div>
                      <div className="col-12">
                        <ProfileDiv
                          label={"Data urodzenia"}
                          value={props.animal?.BirthDate}
                        />
                      </div>
                      <div className="col-12">
                        <ProfileDiv
                          label={"Rasa"}
                          value={`${props.animal?.AnimalType.Race},${props.animal?.AnimalType.Family}`}
                        />
                      </div>
                      <div className="col-12">
                        <ProfileDiv
                          label={"Waga"}
                          value={props.animal?.Weight}
                        />
                      </div>
                      <div className="col-12">
                        <ProfileDiv
                          label={"Płeć"}
                          value={
                            props.animal?.Sex == 1
                              ? "Samiec"
                              : props.animal?.Sex == 2
                              ? "Samica"
                              : "Nieokreślono"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-5">
                <div className=" row justify-content-center">
                  <div className="col-lg-12 col-10 ">
                    <div className="card-title">
                      <h5>Informacje właściciela</h5>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <ProfileDiv
                          label={"Właściciel"}
                          value={`${props.owner?.Name} ${props.owner?.LastName}`}
                        />
                      </div>
                      <div className="col-12">
                        <ProfileDiv
                          label={"Email"}
                          value={props.owner?.Email}
                        />
                      </div>
                      <div className="col-12">
                        <ProfileDiv
                          label={"Telefon"}
                          value={props.owner?.Contact}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalProfile;
