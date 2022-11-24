function VetProfileNav(props) {
  function onChangeTab(e) {
    props.onChange(e);
  }

  return (
    <ul className="nav nav-pills mb-3">
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
    </ul>
  );
}

export default VetProfileNav;
