import { ReactComponentElement, useEffect, useState } from "react";
import { List, ListUl } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
interface elementType {
  label: string;
  link: string;
  icon:any;
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
    < >
      <li className="hover-overlay " style={{}}>
     
        <a
          className="text-decoration-none btn btn-toogle rounded collapsed"
          role={"button"}
          data-bs-toggle="collapse"
          data-bs-target={"#" + props.id}
          aria-expanded="false"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
         
        >
          <h5>  {props.label}</h5>
       
        </a>
     
       
      </li>
      
      <div
        id={props.id}
        className={currentLocation.includes(props.mainLink) ? "" : "collapse "}
        data-parent="#accordion"
      >
        {props.elements.map((element) => {
          return (
            <li className="d-flex justify-content-start ms-4 ">
              <div className="d-flex align-items-center">
              {element.icon}
              </div>
             <div className="">
              <a
                className=
                  {currentLocation==(element.link)?
                    " text-decoration-none btn btn-group-toggle d-flex align-items-center":
                  "  text-decoration-none btn btn-group-toggle d-flex align-items-center"} 

                href={element.link}
              >
               {element.label}
              

              </a>
              </div>
              
            </li>
          );
        })}
      </div>
    </>
  );
}

export default NavElement;
