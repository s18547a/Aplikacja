import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
interface elementType {
  label: string;
  link: string;
}
function NavElement(props: {
  id: string;
  label: string;
  mainLink: string;
  elements: elementType[];
}) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentLocation = location.pathname;
  const [isActive,setIsAcitve]=useState(false)
  useEffect(() => {
    if (currentLocation.includes(props.mainLink)) {
      setCollapsed(true);
      setIsAcitve(true);
    }
  });

  return (
    <div className="border bg-white ">
      <li className="">
        <a
          className="nav-link  text-white"
          role={"button"}
          data-bs-toggle="collapse"
          data-bs-target={"#" + props.id}
          aria-expanded="false"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          style={{background: "#3373C4"}}
        >
          <h5 style={{"fontWeight":"bold"}}>{props.label}</h5>
        </a>
      </li>
      <div
        id={props.id}
        className={currentLocation.includes(props.mainLink) ? "" : "collapse "}
        data-parent="#accordion"
      >
        {props.elements.map((element) => {
          return (
            <li className="nav-item border">
              <a
                className=
                  {currentLocation==(element.link)?"nav-link bg-primary text-white":"nav-link "} 

                href={element.link}
              >
                <h6 style={{"fontWeight":"bold"}}> {element.label}</h6>
              </a>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default NavElement;
