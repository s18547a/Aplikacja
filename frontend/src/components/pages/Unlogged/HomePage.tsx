import { useState } from 'react';

import HomePageNavigation from './HomePageNavigation';
import InfoPage from './InfoPage';
import LoginForm from './LoginForm';
import MainPageCaroseul from './MainPageCaroseul';
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
        <div className="" style={{height:"100%",width: "100%" }}>
            <div className='row'  style={{height:"100%",width: "100%" }}>
                <div className='col-6'  style={{height:"100%",width: "50%" }}>
                <MainPageCaroseul/>
                </div>

                <div className='col-6'>
                <div className="row justify-content-center m-3">
                    <div className='col-6'>
                    <HomePageNavigation onChange={changeTab} selected={selectedTab} />
              
                    </div>
              
                    
              
            </div>
            <div className='row mt-4'>
                    <div className='col-12'>
                    {selectedComponent()}
                    </div>

                </div>

                </div>

            </div>
            

           

           
        </div>
    );
}

export default HomePage;
