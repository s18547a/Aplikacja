import { useEffect, useState } from "react";
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "../../Modal/Modal";

import ModalEnableBtn from "../../Modal/ModalEnableBtn";
import { getCurrentUser, isAuthenticated } from "../../other/authHelper";
import { getLogo } from "../../other/imageHelper";
import { getUserName, isManager, isOwner, isVet } from "../../other/userType";

function BannerComponent(props) {
  function handleLogout() {
    props.handleLogout();
  }
  const navigate = useNavigate();

  let logoutBtn = (
    <ModalEnableBtn
      label="Wyloguj"
      className="btn btn-danger"
      id={"logoutModal"}
    />
  );

  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      if (isOwner()) {
        setUserType("Właściciel");
      } else if (isVet() && !isManager()) {
        setUserType("Weterynarz");
      } else if (isManager()) {
        setUserType("Menadżer");
      }
    }
  }, []);

  const loggedUser = () => {
    return isAuthenticated() ? (
      <div className="">
        <div className="">
          <Modal
            label={"Czy na pewno?"}
            function={handleLogout}
            id={"logoutModal"}
          />
        </div>
        <nav
          className=" nav navbar-dark  sticky-top row"
          style={{ background: "#3373C4", height: "75px" , width:"100%"}}
        >
          <div className="col-6 ">
            <div className="row">
              <div className="col-2">
                <img height="75px" width="100px" src={getLogo()} />
              </div>
              <div
                className="col-6 align-self-center"
                style={{ color: "white" }}
              >
                <h4>Klinka</h4>
                <h4>Vet</h4>
              </div>
            </div>
          </div>
          <div className="col-6  align-self-center">
            <div className="row justify-content-end">
              <div className="col-auto ">
                <div className="row">
                  <div className="col-12 ">
                    <h6 style={{ color: "white" }}>
                      <p>{getCurrentUser().Email}</p>
                    </h6>
                  </div>
                  <div className="col-12">
                    <h6 style={{ color: "white" }}>{getUserName()}</h6>
                  </div>
                </div>
              </div>
              <div className="col-auto  align-self-center">{logoutBtn}</div>
            </div>
          </div>
        </nav>
      </div>
    ) : <nav
    className=" nav navbar-dark  sticky-top d-flex justify-content-center"
    style={{ background: "#3373C4", height: "75px" , width:"100%"}}
  >
    
      <div className="row ">
        <div className="col-6">
        <img height="75px" width="100px" src={getLogo()} />

        </div>
        <div className="col-6">
        <div
          className="col-6 align-self-center"
          style={{ color: "white" }}
        >
          <h4>Klinka</h4>
          <h4>Vet</h4>
        </div>

        </div>
       
      
        
       
      </div>
    
    
  </nav>;
  };

  return loggedUser();
}

export default BannerComponent;
