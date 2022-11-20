import { off } from "process";
import { useCallback, useContext, useState } from "react";
import { getLogo } from "../../other/imageHelper";
import UnloggedLogo from "../Shared/UnloggedLogo";
import HomePageNavigation from "./HomePageNavigation";
import InfoPage from "./InfoPage";
import LoginForm from "./LoginForm";

function HomePage(props) {
  function handleLogin(e) {
    props.handleLogin(e);
  }

  const [selectedTab, setSelectedTab] = useState("login");

  


  function selectedComponent() {
    if (selectedTab == "login") {
      return <LoginForm handleLogin={handleLogin} />;
    }
    if (selectedTab == "sch") {
      return <InfoPage />;
    }
  }

  function changeTab(e) {
    const value = e.target.value;
    setSelectedTab(value);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          <UnloggedLogo />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-4">
          <HomePageNavigation onChange={changeTab} selected={selectedTab} />
        </div>
      </div>

      {selectedComponent()}
    </div>
  );
}

export default HomePage;
