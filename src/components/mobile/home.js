import React from 'react'
import './css/home.css'

import insightIcon from '../../images/insight icon.svg';

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

let cookieauthtoken = getCookie('cookieauthtoken');
let cookieusername = getCookie('cookieusername');
let accountInfo = 0;

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

        accountInfo = data;

        console.log(accountInfo);
    });
getUserData();

console.log(accountInfo);








class Home extends React.Component {
    render() {
        return (
            <div className={'wrapper'}>
                <div className="welcomeMessage">
                    Hey, <br/> Welcome back!
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
                                <li>10</li>
                                <li>10</li>
                            </ul>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default Home;