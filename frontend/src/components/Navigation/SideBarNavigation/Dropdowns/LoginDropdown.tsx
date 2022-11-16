import { useLocation } from "react-router-dom";
import NavBtn from "../NavBtn";

function LoginDropdown() {
  return <NavBtn link={"/log"} label={"Logowanie"} />;
}
export default LoginDropdown;
