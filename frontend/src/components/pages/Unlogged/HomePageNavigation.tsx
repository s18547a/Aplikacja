function HomePageNavigation(props) {
  function onChangeTab(e) {
    const {name,value}=e.target;
    props.onChange(value);
  }
  return (
    <ul className="nav nav-pills border-0">
      <li className="nav-item ">
        <button
          className={props.selected == "login" ? "nav-link active" : "nav-link"}
          value="login"
          onClick={onChangeTab}
          style={{"fontWeight":"bold"}}
        >
          Logowanie
        </button>
      </li>
      <li className="nav-item">
        <button
          className={props.selected == "sch" ? "nav-link active" : "nav-link"}
          value="sch"
          onClick={onChangeTab}
          style={{"fontWeight":"bold"}}
        >
          Godziny otwarcia
        </button>
      </li>
      <li className="nav-item">
        <button
        className={props.selected=="register"?"nav-link active" :"nav-link"}
        value="register"
        onClick={onChangeTab}
        style={{"fontWeight":"bold"}}
        >
          Zarejestruj
        </button>

      </li>
    </ul>
  );
}

export default HomePageNavigation;
