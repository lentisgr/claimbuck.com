import React, {useState, useEffect} from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const Redeem = () => {
    const cookieauthtoken = cookies.get('cookieauthtoken');
    const cookieusername = cookies.get('cookieusername');

    const [accountInfo, setAccountInfo] = useState([]);
    const [giftcardData, setGiftcardData] = useState([]);

    useEffect(() => {
        getUserData()
    }, []);

    useEffect(() => {
        getGiftcardData()
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
            console.log(data);
            setAccountInfo(data);
        });

    const getGiftcardData = async () => fetch('http://mintrexo-testarea.xyz/web_api/index.php', {
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
        <div className="redeemWrapperDesktop">

            <div className="balance">
                <h2>Balance: <span>{accountInfo.points + 'p'}</span></h2>
            </div>

            <div className="giftcardGrid">

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


                {/*actual loop*/}
                {giftcardData.map(giftcard => (
                    <div key={giftcard.title} className="giftcard">
                        <img className={'giftcardImg'} src={giftcard.thumbnail} alt=""/>
                        <div className="giftcardContent">
                            <p className={'giftcardTitle'}>{giftcard.title}</p>
                            <button className={'redeem'}>{giftcard.pointValue + 'p'}</button>
                        </div>
                    </div>
                ))}


            </div>


        </div>
    )
};

export default Redeem;