import React, {useState} from "react";
import './css/earn.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cookieauthtoken = cookies.get('cookieauthtoken');
const cookieusername = cookies.get('cookieusername');
const countryCode = cookies.get('cookiecountrycode');
const username = null;

const Earn = () => {

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

    const [wall, setWall] = useState('https://wall.adgaterewards.com/nqqYrw/' + 'ss');

    const changeToWall_1 = function () {
        setWall('https://wall.adgaterewards.com/nqqYrw/' + 'ss');
    };

    const changeToWall_2 = function () {
        setWall('https://www.offertoro.com/ifr/show/19322/' + 'ss' + '/8063');
    };

    return (
        <div className={'wrapper'}>

            <nav role="navigation" className={'offerMenu'}>
                <button id={'changeWall_1'} onClick={changeToWall_1}>
                    Offerwall 1
                </button>
                <button id={'changeWall_2'} onClick={changeToWall_2}>
                    Offerwall 2
                </button>
            </nav>

            <div className="offerContainer">
                <iframe title={'offerwall1'} className={'offerwall1'} src={wall}> </iframe>
            </div>

        </div>


    )
};


export default Earn;
