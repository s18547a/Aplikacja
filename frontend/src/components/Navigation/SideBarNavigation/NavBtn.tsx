function NavBtn(props: { link: string; label: string }) {
  return (
    <div className="   border " style={{background: "#3373C4"}}>
      <li className="nav-item">
        <h5 className="">
          <a
            className={"nav-link text-white"}
            aria-current="page"
            href={props.link}
          >
            {props.label}
          </a>
        </h5>
      </li>
    </div>
  );
}

export default NavBtn;
