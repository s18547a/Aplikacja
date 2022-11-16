function AnimalProfileNav(props) {
  function setSelectedTabFunction(e) {
    props.setSelectedTab(e);
  }

  return (
    <ul className="nav nav-tabs border-0 row justify-content-center">
      <div className="col-lg-1 ">
        <li className="nav-item">
          <button
            className={props.activeTab == "" ? "nav-link active " : "nav-link"}
            value={""}
            onClick={setSelectedTabFunction}
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
          >
            Szczepienia
          </button>
        </li>
      </div>
    </ul>
  );
}

export default AnimalProfileNav;
