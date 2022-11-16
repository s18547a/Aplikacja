function HomePageNavigation(props) {
  function onChangeTab(e) {
    props.onChange(e);
  }
  return (
    <ul className="nav nav-tabs border-0">
      <li className="nav-item ">
        <button
          className={props.selected == "login" ? "nav-link active" : "nav-link"}
          value="login"
          onClick={onChangeTab}
        >
          Logowanie
        </button>
      </li>
      <li className="nav-item">
        <button
          className={props.selected == "sch" ? "nav-link active" : "nav-link"}
          value="sch"
          onClick={onChangeTab}
        >
          Godziny otwarcia
        </button>
      </li>
    </ul>
  );
}

export default HomePageNavigation;
