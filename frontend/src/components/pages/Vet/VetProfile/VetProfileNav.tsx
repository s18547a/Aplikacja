function VetProfileNav(props) {
  function onChangeTab(e) {
    props.onChange(e);
  }

  return (
    <ul className="nav nav-pills  row justify-content-center mb-3">
<div className="col-auto">
      <li>
        <button
          className={props.activeTab == "" ? "nav-link active " : "nav-link"}
          value={""}
          onClick={onChangeTab}
          style={{"fontWeight":"bold"}}
        >
          Profil
        </button>
      </li>
      </div>
      <div className="col-auto">
      <li>
        <button
          className={props.activeTab == "res" ? "nav-link active" : "nav-link"}
          value={"res"}
          onClick={onChangeTab}
          style={{"fontWeight":"bold"}}
        >
          {" "}
          Dziesiejsze rezerwacje
        </button>
      </li>
      </div>
    </ul>
  );
}

export default VetProfileNav;
