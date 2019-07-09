import React, {useState, useEffect} from "react";
import './css/redeem.css';


const Redeem = () => {

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
    // let cookieauthtoken = getCookie('cookieauthtoken');
    // let cookieusername = getCookie('cookieusername');
    const [accountInfo, setAccountInfo] = useState([]);
    const [giftcardData, setGiftcardData] = useState([]);

    useEffect(() => {
        getUserData()
    }, []);

    useEffect(() => {
        getGiftcardData()
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

    const getGiftcardData = async () => fetch('https://claimbuck.com/web_api/index.php', {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'request='
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            setGiftcardData(data);
        });


    return (
        <div className="redeemWrapper">

            <div className="balance">
                <h2>Balance: <span>{accountInfo.points + 'p'}</span></h2>
            </div>


            <div className="giftcardContainer">

                {/*voorbeeld*/}
                <div className="giftcard">
                    <img className={'giftcardImg'}
                         src={/*giftcard.thumbnail*/ 'https://www.pcgamesupply.com/media/assets/images/MobileGroupImages/Amazon.png'}
                         alt=""/>
                    <div className="giftcardContent">
                        <p className={'giftcardTitle'}>{/*giftcard.title*/} Amazon - 10$</p>
                        <button className={'redeem'}>1000p</button>
                    </div>
                </div>

                <div className="giftcard">
                    <img className={'giftcardImg'}
                         src={/*giftcard.thumbnail*/ 'https://www.pcgamesupply.com/media/assets/images/MobileGroupImages/Amazon.png'}
                         alt=""/>
                    <div className="giftcardContent">
                        <p className={'giftcardTitle'}>{/*giftcard.title*/} Amazon - 10$</p>
                        <button className={'redeem'}>1000p</button>
                    </div>
                </div>

                <div className="giftcard">
                    <img className={'giftcardImg'}
                         src={/*giftcard.thumbnail*/ 'https://www.pcgamesupply.com/media/assets/images/MobileGroupImages/Amazon.png'}
                         alt=""/>
                    <div className="giftcardContent">
                        <p className={'giftcardTitle'}>{/*giftcard.title*/} Amazon - 10$</p>
                        <button className={'redeem'}>1000p</button>
                    </div>
                </div>

                <div className="giftcard">
                    <img className={'giftcardImg'}
                         src={/*giftcard.thumbnail*/ 'https://www.pcgamesupply.com/media/assets/images/MobileGroupImages/Amazon.png'}
                         alt=""/>
                    <div className="giftcardContent">
                        <p className={'giftcardTitle'}>{/*giftcard.title*/} Amazon - 10$</p>
                        <button className={'redeem'}>1000p</button>
                    </div>
                </div>


                {giftcardData.map(giftcard => (
                    <div key={giftcard.title} className="giftcard">
                        <img className={'giftcardImg'} src={giftcard.thumbnail} alt=""/>
                        <div className="giftcardContent">
                            <p className={'giftcardTitle'}>{giftcard.title}</p>
                            <button className={'redeem'}>{giftcard.pointValue + 'p'}</button>
                        </div>
                    </div>
                ))};
            </div>


        </div>
    )
};

export default Redeem;