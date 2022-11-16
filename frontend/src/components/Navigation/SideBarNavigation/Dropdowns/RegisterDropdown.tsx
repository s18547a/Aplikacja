import { useLocation } from "react-router-dom";
import NavBtn from "../NavBtn";

function RegisterDropdown() {
  const location = useLocation();
  const currentLocation = location.pathname;

  return <NavBtn link={"/register"} label={"Rejestracja"} />;
}

export default RegisterDropdown;
