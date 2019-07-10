import React, {useState, useEffect} from 'react'
import './css/home.css'
import Cookies from 'universal-cookie';

import insightIcon from '../../images/insight icon.svg';
const cookies = new Cookies();
const Home = () => {

    const cookieauthtoken = cookies.get('cookieauthtoken');
    const cookieusername = cookies.get('cookieusername');
    const [accountInfo, setAccountInfo] = useState([]);

    useEffect(() => {
        getUserData()
    }, []);

    const getUserData = async () => fetch('http://mintrexo-testarea.xyz/web_api/index.php', {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'request=userInfo&auth_token=' + cookieauthtoken + '&username=' + cookieusername
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            checkMessage(data);
        });

    function checkMessage(data) {
        if (data.succeed === 'true') {
            setAccountInfo(data);
        } else if (data.message === '4_2'||data.message === '4_1') {
            window.location = '/landingpage';
            cookies.remove('cookieusername');
            cookies.remove('cookieauthtoken');
        }
    }


    return (
        <div className={'wrapper'}>
            <div className="welcomeMessage">
                Hey {cookieusername}, <br/> Welcome back!
            </div>

            <div className="insightsContainer">
                <div className="insightsHeader">
                    <h1><span className={'icon'}><img src={insightIcon} alt=""/></span>Insights</h1>
                </div>
                <div className="insightsContent">
                    <div className="insightsText">
                        <ul>
                            <li>Balance:</li>
                            <li>Earnings:</li>
                            <li>Offers completed:</li>
                        </ul>
                    </div>
                    <div className="insightsData">
                        <ul>
                            <li className={'balance'}>{accountInfo.points}</li>
                            <li>{accountInfo.total_points}</li>
                            <li>{accountInfo.completed_offers}</li>
                        </ul>
                    </div>
                </div>
            </div>


        </div>
    )
};


export default Home;