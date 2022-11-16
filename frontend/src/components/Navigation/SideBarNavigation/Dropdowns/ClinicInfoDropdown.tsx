import { useLocation } from "react-router-dom";
import NavBtn from "../NavBtn";

function ClinicInfoDropdown() {
  return <NavBtn link={"/info"} label={"Informacje"} />;
}

export default ClinicInfoDropdown;
