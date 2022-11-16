import { useEffect, useState } from "react";
import { getVetSchedulde } from "../../../api/vetApiCalls";
import { isManager } from "../../../../components/other/userType";
interface ScheduldeI {
  Monday: string | null | undefined;
  Tuesday: string | null | undefined;
  Wednesday: string | null | undefined;
  Thursday: string | null | undefined;
  Friday: string | null | undefined;
  Saturday: string | null | undefined;
  Sunday: string | null | undefined;
}

function VetSchedulde(props) {
  const [schedulde, setSchedulde] = useState<ScheduldeI>({
    Monday: undefined,
    Tuesday: undefined,
    Wednesday: undefined,
    Thursday: undefined,
    Friday: undefined,
    Saturday: undefined,
    Sunday: undefined,
  });

  useEffect(() => {
    let response;
    let promise;

    promise = getVetSchedulde(props.VetId);
    if (promise) {
      promise
        .then((data) => {
          response = data;
          return response.json();
        })
        .then(
          (data) => {
            if (response.status == 200) {
              setSchedulde(data);
            }

            if (response.status == 404) {
            }
            if (response.status == 500) {
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, []);

  return (
    <div className="card card-body ">
      <div className="card-title">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <h5>Godziny</h5>
              </div>
              <div className="col-6">
                {isManager() ? (
                  <a
                    className="btn btn-primary"
                    href={`/vets/${props.VetId}/schedulde/edit`}
                  >
                    Edytuj
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-5">
                <p>Poniedziałek</p>
              </div>
              <div className="col-7">
                <p>{schedulde.Monday == null ? "Brak" : schedulde.Monday}</p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-5">
                <p>Wtorek</p>
              </div>
              <div className="col-7">
                <p>{schedulde.Tuesday == null ? "Brak" : schedulde.Tuesday}</p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-5">
                <p>Środa</p>
              </div>
              <div className="col-7">
                <p>
                  {schedulde.Wednesday == null ? "Brak" : schedulde.Wednesday}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-5">
                <p>Czwartek</p>
              </div>
              <div className="col-7">
                <p>
                  {schedulde.Thursday == null ? "Brak" : schedulde.Thursday}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-5">
                <p>Piątek</p>
              </div>
              <div className="col-7">
                <p>{schedulde.Friday == null ? "Brak" : schedulde.Friday}</p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-5">
                <p>Sobota</p>
              </div>
              <div className="col-7">
                <p>
                  {schedulde.Saturday == null ? "Brak" : schedulde.Saturday}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-5">
                <p>Niedziela</p>
              </div>
              <div className="col-7">
                <p>{schedulde.Sunday == null ? "Brak" : schedulde.Sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetSchedulde;
