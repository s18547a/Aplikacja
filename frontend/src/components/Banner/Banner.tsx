import { Route, Routes, Navigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from "../other/authHelper";
import { Link } from "react-router-dom";
const bootstrap = require("bootstrap");
function Banner(props) {
  function handleLogout() {
    props.handleLogout();
  }

  const logoutReg = isAuthenticated() ? (
    <button
      className="col align-self-start btn btn-danger"
      onClick={handleLogout}
    >
      Wyloguj
    </button>
  ) : (
    <Link to="/ownerRegister" className="col align-self-start ">
      Zarejstruj
    </Link>
  );

  return (
    <div className="container ">
      <div className="row">
        <div className="col-6 ">
          <img
            src={require("../../images/logo.png")}
            height="150px"
            width="150px"
          />
        </div>
        <div className="col-6">
          <h1 className="col align-self-center">Klinika Vola-Vet</h1>
        </div>
      </div>
    </div>
  );
}

export default Banner;
