import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavElement from "../NavElement";

function AnimalDropdown() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <NavElement
      id={"animals"}
      mainLink={"/animals"}
      label={"Zwierzęta"}
      elements={[
        { label: "Lista", link: "/animals" },
        { label: "Zarejestruj", link: "/animals/register" },
      ]}
    />
  );
}

export default AnimalDropdown;
