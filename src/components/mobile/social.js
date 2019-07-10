import React from "react";
import './css/social.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const cookieauthtoken = cookies.get('cookieauthtoken');
const cookieusername = cookies.get('cookieusername');

const authCheck = async () => fetch('http://mintrexo-testarea.xyz/web_api/index.php', {
    method: 'POST',
    headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: 'request=authCheck&auth_token=' + cookieauthtoken + '&username=' + cookieusername
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        checkMessage(data);
    });

function checkMessage(data) {
    if (data.message === '4_2'||data.message === '4_1') {
        window.location = '/landingpage';
        cookies.remove('cookieusername');
        cookies.remove('cookieauthtoken');
    }
}

authCheck();

class Social extends React.Component {
    render() {
        return (
            <div className={'wrapper'}>
                <div className="socialContainer">
                    <div className="discordBanner">

                    </div>
                </div>
            </div>
        )
    }
}

export default Social;