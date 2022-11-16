function VetProfileNav(props) {
  function onChangeTab(e) {
    props.onChange(e);
  }

  return (
    <ul className="nav nav-tabs bor">
      <li>
        <button
          className={props.activeTab == "" ? "nav-link active " : "nav-link"}
          value={""}
          onClick={onChangeTab}
        >
          Profil
        </button>
      </li>
      <li>
        <button
          className={props.activeTab == "res" ? "nav-link active" : "nav-link"}
          value={"res"}
          onClick={onChangeTab}
        >
          {" "}
          Dziesiejsze rezerwacje
        </button>
      </li>
    </ul>
  );
}

export default VetProfileNav;
