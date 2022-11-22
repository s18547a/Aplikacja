import { useState } from 'react';

import HomePageNavigation from './HomePageNavigation';
import InfoPage from './InfoPage';
import LoginForm from './LoginForm';
import RegisterPage from './RegisterPage';

function HomePage(props) {
    function handleLogin(e) {
        props.handleLogin(e);
    }

    const [selectedTab, setSelectedTab] = useState('login');

  


    function selectedComponent() {
        if (selectedTab == 'login') {
            return <LoginForm handleLogin={handleLogin} />;
        }
        if (selectedTab == 'sch') {
            return <InfoPage />;
        }
        if(selectedTab=='register'){
            return <RegisterPage changeTab={changeTab}/>
        }
    }

    function changeTab(value) {
     
        setSelectedTab(value);
    }

    return (
        <div className="container">
            

            <div className="row justify-content-center">
                <div className="col-4 mb-5">
                    <HomePageNavigation onChange={changeTab} selected={selectedTab} />
                </div>
            </div>

            {selectedComponent()}
        </div>
    );
}

export default HomePage;
