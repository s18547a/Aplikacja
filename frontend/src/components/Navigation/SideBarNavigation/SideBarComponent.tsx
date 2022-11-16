import { useLocation } from "react-router-dom";
import ModalEnableBtn from "../../Modal/ModalEnableBtn";
import { isAuthenticated } from "../../other/authHelper";
import { isOwner, isVet, isManager } from "../../other/userType";
import AnimalDropdown from "./Dropdowns/AnimalDropdown";
import ClinicInfoDropdown from "./Dropdowns/ClinicInfoDropdown";
import LoginDropdown from "./Dropdowns/LoginDropdown";
import RegisterDropdown from "./Dropdowns/RegisterDropdown";
import ReservationDropdown from "./Dropdowns/ReservationDropdown";
import SurgeryDropdown from "./Dropdowns/SurgeryDropdown";
import UserProfileDropdown from "./Dropdowns/UserProfileDropdown";
import VetDropdown from "./Dropdowns/VetDropdown";
import VisitDropdown from "./Dropdowns/VisitDropdown";

function SideBar() {
  const location = useLocation();

  const currentLocation = location.pathname;

  const vetNav = (
    <div className="">
      <UserProfileDropdown />
      <AnimalDropdown />
      <ReservationDropdown />
      <VisitDropdown />
      <SurgeryDropdown />
    </div>
  );

  const vetManagerNav = (
    <div>
      <div className="col-12 ">
        <UserProfileDropdown />
      </div>
      <div className="col-12">
        <AnimalDropdown />
      </div>
      <div className="col-12">
        <ReservationDropdown />
      </div>
      <div className="col-12">
        <VisitDropdown />
      </div>
      <div className="col-12">
        <SurgeryDropdown />
      </div>
      <div className="col-12">
        <VetDropdown />
      </div>
    </div>
  );

  const ownerNav = (
    <>
      <UserProfileDropdown />
      <AnimalDropdown />
      <ReservationDropdown />
      <VisitDropdown />
    </>
  );

  const userNaviagion = () => {
    if (!isAuthenticated()) {
      return null;
    } else if (isOwner()) {
      return ownerNav;
    } else {
      if (isVet() && isManager()) {
        return vetManagerNav;
      } else if (isVet() && !isManager()) {
        return vetNav;
      } else null;
    }
  };

  return (
    <ul className="nav flex-column" style={{ background: "white" }}>
      {userNaviagion()}
    </ul>
  );
}

export default SideBar;
