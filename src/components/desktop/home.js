import React, {useEffect,useState} from 'react';
import './css/home.css';
import insightIcon from "../../images/insight icon.svg";

const Home = () => {

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    let username = 'XRaider';
    let cookieauthtoken = getCookie('cookieauthtoken');
    let cookieusername = getCookie('cookieusername');
    const [accountInfo, setAccountInfo] = useState([]);

    useEffect(() => {
        getUserData()
    }, []);

    const getUserData = async () => fetch('https://claimbuck.com/web_api/index.php', {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'request=userInfo&auth_token=' + 'vY6RiAxQoKHzdkZyEa2XLgIht7PcMGwlbu5qWN4Jp3jOVU1F' + '&username=' + 'ss'
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            setAccountInfo(data);
        });

    return (
        <div className="desktopContainer">
            <div className="desktopWelcomeMessage">
                Hey {username}, <br/> Welcome back!
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