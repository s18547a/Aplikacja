import { useState } from "react";
import { registerOwnerApiCall } from "../../api/ownerApiCalls";
import { useNavigate } from "react-router-dom";
import FormDiv from "../../../components/Form/FormDiv";
import SubmitFormButton from "../../../components/General/SubmitFormButton";

function OwnerRegister(props) {
  const [owner, setOwner] = useState({
    Name: "",
    LastName: "",
    Contact: "",
    Email: "",
    Password: "",
  });
  const [error, setError] = useState({
    Name: "",
    LastName: "",
    Contact: "",
    Email: "",
    Password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  let naviage = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
 
    setOwner((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    let isValid = true;

    for (const [name, value] of Object.entries(owner)) {
      error[name] = "";
      setPasswordError("");

      if (name === "Email") {
        if (!value.includes("@") && value !== "") {
          setError((prevErrors) => ({
            ...prevErrors,
            [name]: "Niepoprawny format Email",
          }));
          isValid = false;
        }
      }
      if (name == "Password") {
        if (value != repeatPassword) {
          setPasswordError("Hasła muszą być takie same");
          isValid = false;
        }
      }
      if (value === "") {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: "Puste pole",
        }));
        isValid = false;
      }
      if(value== ""){
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: "Puste pole",
        }));
        isValid = false;

      }
      if(name== "Contact"){
        const isNumber=/^\d+$/.test(value)
       

     
        if(value.length<9||!isNumber){
          
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: "Niepoprawny number",
        }));
        isValid = false;
        }


      }
    }
    return isValid;
  }


  function changeTab(){

    props.changeTab("login")
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      let response;
      let promise;
      promise = registerOwnerApiCall(owner);
      if (promise) {
        promise
          .then((data) => {
            response = data;

            return response.json();
          })
          .then(
            (data) => {
              if (response.status === 500) {
              }
              if (response.status == 404) {
                setError((prev) => ({
                  ...prev,
                  Email: "Email jest już zarejestrowany",
                }));
              }
              if (response.status === 201) {

               changeTab();
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }

  function handleRepeatPassword(e) {
    const { name, value } = e.target;
    setRepeatPassword(value);
  }

  return (
    <form className="container " onSubmit={handleSubmit} noValidate={true}>
      <div className="row">
      
        <div className="col-lg-6 offset-lg-3">
          <div className="card card-body border-0">
            
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-lg-6">
                    <FormDiv
                      name="Name"
                      label="Imie"
                      error={error.Name}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormDiv
                      name="LastName"
                      label="Nazwisko"
                      error={error.LastName}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="row">
                  <div className="col-lg-6">
                    <FormDiv
                      name="Contact"
                      label="Numer telefonu"
                      error={error.Contact}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormDiv
                      name="Email"
                      label="Email"
                      error={error.Email}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-lg-6">
                    <FormDiv
                      name="Password"
                      label="Hasło"
                      error={error.Password}
                      onChange={handleChange}
                      type="password"
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormDiv
                      name="Password2"
                      label="Powtórz hasło"
                      error={passwordError}
                      onChange={handleRepeatPassword}
                     
                      type="password"
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <SubmitFormButton label="Zarejestruj" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default OwnerRegister;
