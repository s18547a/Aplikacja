import { useEffect, useState } from "react";
import { DoorClosed } from "react-bootstrap-icons";
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal/Modal";

import ModalEnableBtn from "../Modal/ModalEnableBtn";
import { getCurrentUser, isAuthenticated } from "../other/authHelper";
import { getLogo } from "../other/imageHelper";
import { getUserName, isManager, isOwner, isVet } from "../other/userType";

function BannerComponent(props) {
  function handleLogout() {
    props.handleLogout();
  }
  const navigate = useNavigate();

  let logoutBtn = (
    <div>
    <ModalEnableBtn
      label="Wyloguj"
      className="btn btn-danger"
      id={"logoutModal"}
      icon={<DoorClosed className="me-2"/>}
    />
    </div>
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
      <>
       
          <Modal
            label={"Czy na pewno?"}
            function={handleLogout}
            id={"logoutModal"}
          />
      
        <nav
          className="nav navbar-dark shadow "
          style={{ background: "#3373C4", height: "75px" , width:"100%", }}
        >
          <div className="row justify-content-between" style={{width:"100%"}}>
          <div className="col-6 ">
            <div className="row">
              <div className="col-2">
                <img height="75px" width="100px" src={getLogo()} />
              </div>
             
            </div>
          </div>
          <div className="col-6 row justify-content-end">
          
              <div className="col-auto align-self-center ">
             
                <div className="d-flex flex-column">

                <p className="text-white">{`Użytkownik: ${getUserName()}`}</p>
                <p className=" text-white dis">{`Email: ${getCurrentUser().Email}`}</p>
                </div>
                  
              </div>
              <div className="col-auto align-self-center">{logoutBtn}</div>
          
          </div>
          </div>
        </nav>
      </>
    ) : <nav
    className=" nav navbar-dark  sticky-top d-flex justify-content-center aling-items-center shadow"
    style={{ background: "#3373C4", height: "100%" , width:"100%"}}
  >
    
      <div className="row align-content-center">
        <div className="col-6 ">
        <img height="75px" width="100px" src={getLogo()} />

        </div>
        <div className="col-6">
        <div
          className="col-6  d-flex justify-content-center"
          style={{ color: "white" }}
        >
          <h4 className=" display-5">Klinka </h4>
          <h4 className="display-5"> Vet</h4>
        </div>

        </div>
       
      
        
       
      </div>
    
    
  </nav>;
  };

  return loggedUser();
}

export default BannerComponent;
