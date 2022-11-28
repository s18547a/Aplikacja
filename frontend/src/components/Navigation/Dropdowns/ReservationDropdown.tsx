import { ListUl, PersonPlus, PlusSquare } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import NavElement from "../NavElement";

function ReservationDropdown() {
  return (
    <NavElement
      id={"reservation"}
      mainLink={"/reservations"}
      label={"Rezerwacje"}
      elements={[
        { label: "Lista", link: "/reservations", icon:<ListUl/>},
        { label: "Zarezerwuj", link: "/reservations/register", icon:<PlusSquare/> },
      ]}
    />
  );
}

export default ReservationDropdown;
