function AnimalProfileNav(props) {
  function setSelectedTabFunction(e) {
    props.setSelectedTab(e);
  }

  return (
    <ul className="nav nav-pills border-0 row justify-content-center mb-3" >
      <div className="col-lg-1 ">
        <li className="nav-item">
          <button
            className={props.activeTab == "" ? "nav-link active " : "nav-link"}
            value={""}
            onClick={setSelectedTabFunction}
            style={{"fontWeight":"bold"}}
          >
            Profil
          </button>
        </li>
      </div>
      <div className="col-lg-1">
        <li className="nav-item">
          <button
            className={
              props.activeTab == "ill" ? "nav-link active" : "nav-link "
            }
            value={"ill"}
            onClick={setSelectedTabFunction}
            style={{"fontWeight":"bold"}}
          >
            Choroby
          </button>
        </li>
      </div>
      <div className="col-lg-2">
        <li className="nav-item">
          <button
            className={
              props.activeTab == "add" ? "nav-link active" : "nav-link "
            }
            value={"add"}
            onClick={setSelectedTabFunction}
            style={{"fontWeight":"bold"}}
          >
            Informacje medyczne
          </button>
        </li>
      </div>
      <div className="col-lg-1">
        <li className="nav-item">
          <button
            className={
              props.activeTab == "vacc" ? "nav-link active" : "nav-link "
            }
            value={"vacc"}
            onClick={setSelectedTabFunction}
            style={{"fontWeight":"bold"}}
          >
            Szczepienia
          </button>
        </li>
      </div>
    </ul>
  );
}

export default AnimalProfileNav;
