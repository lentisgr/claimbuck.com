import React, {useEffect,useState} from 'react';
import './css/home.css';
import insightIcon from "../../images/insight icon.svg";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const Home = () => {

    const cookieauthtoken = cookies.get('cookieauthtoken');
    const name = cookies.get('cookieusername').replace(/_/g, " ");
    const cookieusername = cookies.get('cookieusername');
    const [accountInfo, setAccountInfo] = useState([]);

    useEffect(() => {
        getUserData()
    }, []);

    const getUserData = async () => fetch('https://claimbuck.com/web_api/index.php', {
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
            window.location = '/landingpage.html';
            cookies.remove('cookieusername');
            cookies.remove('cookieauthtoken');
        }
    }

    if(cookieauthtoken==null||cookieusername==null) {
        window.location = '/landingpage.html';
    } else {
        return (
            <div className="desktopContainer">
                <div className="desktopWelcomeMessage">
                    Hey {name}, <br/> Welcome back!
                </div>
                <div className="desktopInsights">
                    <div className="desktopInsightsContainer">
                        <div className="desktopInsightsHeader">
                            <h1><span className={'icon'}><img src={insightIcon} alt=""/></span>Insights</h1>
                        </div>
                        <div className="desktopInsightsContent">
                            <div className="desktopInsightsText">
                                <p>Balance:</p>
                                <p>Earnings:</p>
                                <p>Offers completed:</p>
                            </div>
                            <div className="desktopInsightsData">
                                <p className={'balance'}>{accountInfo.points}</p>
                                <p>{accountInfo.total_points}</p>
                                <p>{accountInfo.completed_offers}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Home;