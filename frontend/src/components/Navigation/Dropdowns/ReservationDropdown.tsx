import { useLocation } from "react-router-dom";
import NavElement from "../NavElement";

function ReservationDropdown() {
  return (
    <NavElement
      id={"reservation"}
      mainLink={"/reservations"}
      label={"Rezerwacje"}
      elements={[
        { label: "Lista", link: "/reservations" },
        { label: "Zarezerwuj", link: "/reservations/register" },
      ]}
    />
  );
}

export default ReservationDropdown;
