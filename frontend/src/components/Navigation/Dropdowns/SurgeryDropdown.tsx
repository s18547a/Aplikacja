import { useLocation } from "react-router-dom";
import NavElement from "../NavElement";

function SurgeryDropdown() {
  return (
    <NavElement
      id={"surgeries"}
      label={"Zabiegi"}
      mainLink={"/surgeries"}
      elements={[
        { label: "Lista", link: "/surgeries" },
        { label: "Nowa operacja", link: "/surgeries/register" },
      ]}
    />
  );
}

export default SurgeryDropdown;
