import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAnimals,
  getAnimalsbyOwner,
  getAnimalsByOwnerEmail,
} from "../../../api/animalApiCalls";
import Animal from "../../../classes/Animal";

import RegiserSuccessInfo from "../../../List/RegisterSuccessInfo";
import TableOrEmpty from "../../../List/TableOrEmpty";
import { getCurrentUser } from "../../../other/authHelper";
import { isManager, isOwner, isVet } from "../../../other/userType";

function AnimalList() {
  const [animals, setAnimalList] = useState<Animal[]>([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [empty, setEmpty] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const [newId, setNewId] = useState("");

  useEffect(() => {
    const loadAnimals = async () => {
      let promise;
      let response;
      if (isOwner()) {
        promise = getAnimalsbyOwner(getCurrentUser().userTypeId);
      } else if (isVet() || isManager()) {
        promise = getAnimals();
      }
      if (promise) {
        promise
          .then((data) => {
            response = data;

            return response.json();
          })
          .then(
            (data) => {
              if (response.status == 200) {
                setAnimalList(data);
              }
              if (response.status == 500) {
                setError(data);
              }
              if (response.status == 404) {
                setEmpty(true);
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    };

    loadAnimals();

    const state = location.state as { id: string };
    if (state != null) {
      setNewId(state.id);
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setSearch(value);
  }
  async function handleSearch() {
    let results;
    console.log(search);
    if (search != "") {
      await getAnimalsByOwnerEmail(search)
        .then((res) => {
          results = res;
          return res.json();
        })
        .then(
          (data) => {
            if (results.status == 200) {
              setEmpty(false);
              setAnimalList(data);
              navigate("/animals");
            }
            if (results.status == 404) {
              setEmpty(true);
              navigate("/animals");
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  const serchDiv = (
    <div className="card card-body">
      <div className="input-group justify-content-center">
        <div className="row">
          <div className="col-12 ">
            <div className="input-group">
              <input
                onChange={handleChange}
                className="form-control rounded"
                placeholder="Email właściciela"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleSearch}
              >
                Szukaj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <RegiserSuccessInfo newId={newId} message={"Zarejestrowane zwierzę: "} />
      {isVet() ? serchDiv : null}
      <div className="card card-body">
        <h5>Zwierzęta</h5>
        <div>
          <div>
            <TableOrEmpty Empty={empty}>
              <table className="table table-hover ">
                <thead>
                  <tr>
                    <th>Imie</th>
                    <th>Rasa</th>
                    <th>Data urodzenia</th>
                  </tr>
                </thead>
                <tbody>
                  {animals.map((animal) => {
                    return (
                      <tr
                        key={animal.AnimalId}
                        onClick={() => {
                          navigate("/animals/" + animal.AnimalId);
                        }}
                      >
                        <td>{animal.Name}</td>
                        <td>
                          {animal.AnimalType?.Family +
                            "," +
                            animal.AnimalType?.Race}
                        </td>
                        <td>{animal.BirthDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </TableOrEmpty>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalList;
