import { useLocation } from "react-router-dom";
import NavBtn from "../NavBtn";

function UserProfileDropdown() {
  const location = useLocation();
  const currentLocation = location.pathname;

  return <NavBtn link={"/"} label={"Profil"} />;
}
export default UserProfileDropdown;
