import { useLocation } from "react-router-dom";
import NavElement from "../NavElement";

function VetDropdown() {
  return (
    <NavElement
      id={"vets"}
      label={"Weterynarze"}
      mainLink={"/vets"}
      elements={[
        { label: "Lista", link: "/vets" },
        { label: "Zatrudnij", link: "/vets/register" },
      ]}
    />
  );
}

export default VetDropdown;
