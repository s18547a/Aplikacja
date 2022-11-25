import { useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { isAuthenticated } from "./components/other/authHelper";

import Navigation from "./components/Banner/BannerComponent";

import OwnerRegister from "./components/pages/Owner/OwnerRegister";
import AnimalList from "./components/pages/Animal/AnimalList/AnimalList";
import AnimalForm from "./components/pages/Animal/AnimalRegister/AnimalForm";

import ReservationsList from "./components/pages/Reservation/ReservationList/ReservationList";
import ReservationForm from "./components/pages/Reservation/ReservationRegister/ReservationForm";
import VisitList from "./components/pages/Visit/VisitList/VisitList";
import VisitRegister from "./components/pages/Visit/VisitRegister/VisitRegister";
import AnimalInfo from "./components/pages/Animal/AnimalProfile/AnimalProfile";
import UserProfile from "./components/pages/General/UserProfile";

import SurgeryForm from "./components/pages/Surgery/SurgeryRegister/SurgeryForm";
import VisitProfile from "./components/pages/Visit/VisitProfile/VisitProfile";
import VetList from "./components/pages/Vet/VetList/VetList";
import { isManager, isVet } from "./components/other/userType";
import VetForm from "./components/pages/Vet/VetRegister/VetForm";
import VetProfile from "./components/pages/Vet/VetProfile/VetProfile";
import VetScheduldeForm from "./components/pages/Vet/VetRegister/VetScheduldeForm";
import SideBar from "./components/Navigation/SideBarComponent";
import HomePage from "./components/pages/Unlogged/HomePage";
import MedicalInfoForm from "./components/pages/Animal/AnimalRegister/AnimalRegisterComponents/MedicalInfoForm";
import SurgeryList from "./components/pages/Surgery/SurgeryList/SurgeryList";
import SurgeryProfile from "./components/pages/Surgery/SurgeryProfile/SurgeryProfile";
const bootstrap = require("bootstrap");

function App() {
  const naviagate = useNavigate();
  const [user, changeUser] = useState(null);

  const handleLogin = (user) => {
    sessionStorage.setItem("user", user);
    changeUser(user);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    changeUser(null);
    naviagate("/");
  };

  const isLogged = (element) => {
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    } else return element;
  };
  const isNotLogged = (element) => {
    if (isAuthenticated()) {
      return element;
    } else return <Navigate to="/home" />;
  };

  const isNotPersonel = (element) => {
    if (isAuthenticated()) {
      if (isVet()) {
        return element;
      } else return <Navigate to="/home" />;
    } else return <Navigate to="/home" />;
  };
  const isNotManager = (elemet) => {
    if (isAuthenticated()) {
      if (isManager()) {
        return elemet;
      } else return <Navigate to="/home" />;
    } else return <Navigate to="/home" />;
  };
  const location = useLocation();
  const currentLocation = location.pathname;
  const style = currentLocation.includes("/home")
    ? {
        height: "100%",
        width: "100%",
        backgroundImage: `url(${require("../src/images/homePage.webp")})`,
      }
    : { height: "100%", width: "100%" };

  return (
    <div style={style}>
      <header style={{ width: "100%", height: "10%" }}>
        <Navigation handleLogout={handleLogout} />
      </header>
    
      <div className="row" style={{ height: "90%", width: "100%" }}>
        <div className="col-lg-1 col-12">
          <SideBar />
        </div>
        <div className="col-lg-11 col-12">
          <main className="" /*</div>style={{margin:"100px"}}*/>
            <Routes>
              <Route
                path="/home"
                element={isLogged(<HomePage handleLogin={handleLogin} />)}
              />
              <Route path="/register" element={<OwnerRegister />} />

              <Route path="/" element={isNotLogged(<UserProfile />)} />

              <Route path="/animals" element={isNotLogged(<AnimalList />)} />
              <Route
                path="/animals/register"
                element={isNotLogged(<AnimalForm />)}
              />

              <Route
                path="/animals/:AnimalId"
                element={isNotLogged(<AnimalInfo />)}
              />
              <Route
                path="/animals/:AnimalId/edit"
                element={isNotLogged(<AnimalForm />)}
              />

              <Route
                path="/reservations/register"
                element={isNotLogged(<ReservationForm />)}
              />
              <Route
                path="/reservations"
                element={isNotLogged(<ReservationsList />)}
              />

              <Route path="/visits" element={isNotLogged(<VisitList />)} />
              <Route
                path="/visits/register"
                element={isNotLogged(isNotPersonel(<VisitRegister />))}
              />

              <Route
                path="/visits/:VisitId"
                element={isNotLogged(<VisitProfile />)}
              />

              <Route
                path="/surgeries/register"
                element={isNotLogged(isNotPersonel(<SurgeryForm />))}
              />
              <Route path="/surgeries" element={isNotLogged(<SurgeryList />)} />

              <Route
                path="/surgeries/:SurgeryId"
                element={isNotLogged(<SurgeryProfile />)}
              />

              <Route path="/vets" element={isNotManager(<VetList />)} />
              <Route
                path="/vets/register"
                element={isNotManager(<VetForm />)}
              />
              <Route
                path="/vets/:VetId"
                element={isNotManager(<VetProfile />)}
              />
               <Route
                path="/vets/:VetId/edit"
                element={isNotManager(<VetForm/>)}
              />
              <Route
                path="/vets/:VetId/schedulde/edit"
                element={isNotManager(<VetScheduldeForm />)}
              />
              
              <Route
                path="/animals/:AnimalId/medicalInfo/edit"
                element={isNotPersonel(<MedicalInfoForm />)}
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
