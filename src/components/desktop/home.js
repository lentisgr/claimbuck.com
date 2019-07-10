import React, {useEffect,useState} from 'react';
import './css/home.css';
import insightIcon from "../../images/insight icon.svg";
import Cookies from 'universal-cookie';
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
        <div className="desktopContainer">
            <div className="desktopWelcomeMessage">
                Hey {cookieusername}, <br/> Welcome back!
            </div>
            <div className="desktopInsights">
                <div className="desktopInsightsContainer">
                    <div className="desktopInsightsHeader">
                        <h1><span className={'icon'}><img src={insightIcon} alt=""/></span>Insights</h1>
                    </div>
                    <div className="desktopInsightsContent">
                        <div className="desktopInsightsText">
                            <ul>
                                <li>Balance:</li>
                                <li>Earnings:</li>
                                <li>Offers completed:</li>
                            </ul>
                        </div>
                        <div className="desktopInsightsData">
                            <ul>
                                <li className={'balance'}>{accountInfo.points}</li>
                                <li>{accountInfo.total_points}</li>
                                <li>{accountInfo.completed_offers}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;