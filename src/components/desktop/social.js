import React from "react";
import './css/social.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const cookieauthtoken = cookies.get('cookieauthtoken');
const cookieusername = cookies.get('cookieusername');

const authCheck = async () => fetch('https://mintrexo-testarea.xyz/web_api/index.php', {
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
        window.location = '/landingpage.html';
        cookies.remove('cookieusername');
        cookies.remove('cookieauthtoken');
    }
}

authCheck();

function openDiscord() {
    window.open('https://discordapp.com/invite/nN4MHCT');
}

class Social extends React.Component {
    render() {
        return (
            <div className={'wrapper'}>
                <div className="socialContainer" style={{
                    maxWidth: '750px'
                }}>
                    <div className="discordBanner" style={{
                        transform: 'TranslateY(25px)',
                        maxWidth: '700px',
                        height: '300px'
                    }} onClick={openDiscord}>

                    </div>

                    <div className="socialContent">
                        <h1>Join our Discord!</h1>
                        <p style={{marginLeft: '20px', marginRight : '20px'}}>Join our Discord to connect and interact with our community, seek support for any issues you have and to meet new people. If you’re interested in keeping up to date with site updates, site restocks and taking part in various community events our Discord is perfect for you.
                            <br/><br/><span style={{fontWeight : 'bold', fontSize : '0.5em' }}>Discord requires all users under the age of 13 to have parental consent when using Discord. Our site rules apply on the Discord and any users that violate our Terms of Service agreement on either the site or Discord will be punished on both platforms.</span></p>
                    </div>

                    <div className="social" style={{marginTop : '50px'}}>
                        <a href="https://discordapp.com/invite/nN4MHCT" target='_blank' rel='noopener noreferrer'><img src="https://www.claimbuck.com/imgs/discord.png" alt=""/></a>
                        <a href="https://twitter.com/Claimbuck" target='_blank' rel='noopener noreferrer'><img src="https://www.claimbuck.com/imgs/twitter.png" alt=""/></a>
                    </div>


                </div>
            </div>
        )
    }
}

export default Social;