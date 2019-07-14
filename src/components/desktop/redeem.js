import React from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class RedeemMobile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: null,
            giftcardData: {},
            cookieauthtoken: cookies.get('cookieauthtoken'),
            cookieusername: cookies.get('cookieusername')
        };
    }
    componentDidMount() {
        Promise.all([fetch('https://mintrexo-testarea.xyz/web_api/index.php', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'request=userInfo&auth_token=' + this.state.cookieauthtoken + '&username=' + this.state.cookieusername
        }), fetch('https://mintrexo-testarea.xyz/web_api/index.php?&request=giftcardData&auth_token=' + this.state.cookieauthtoken + '&username=' + this.state.cookieusername, {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })])

            .then(([res1, res2]) => {
                return Promise.all([res1.json(), res2.json()])
            })
            .then(([res1, res2]) => {
                this.setState({
                    userInfo: res1,
                    giftcardData: res2
                })
            })
    }

    _renderObject(){
        let giftcards = this.state.giftcardData;
        return Object.entries(giftcards).map(([key, giftcard], i) => {
            let stockClass = null;
            if(giftcard.instock === 'true') {
                stockClass = true;
            } else {
                stockClass = false;
            }
            return (
                <div key={i} className="giftcard">
                    <div className={'giftcardImgDiv'}>
                        <img className={'giftcardImg'}
                             src={giftcard.image_url}
                             alt={giftcard.type+" giftcard"}/>
                        <div className={(stockClass ? 'giftcardStockOn' : 'giftcardStockOff')}>{(stockClass ? 'In stock' : 'No stock')}</div>
                    </div>
                    <div className="giftcardContent">
                        <p className={'giftcardTitle'}>{giftcard.type+" $"+giftcard.value}</p>
                        <button className={(this.state.userInfo.points>giftcard.points&&stockClass ? 'redeemButtonOn' : 'redeemButtonOff')}>{giftcard.points + 'p'}</button>
                    </div>
                </div>
            )
        });
    }
    render() {
        if(this.state.giftcardData&&this.state.userInfo) {
            return (
                <div className="redeemWrapper">
                    <div className="balance">
                        <h2>Balance: <span>{this.state.userInfo.points + 'p'}</span></h2>
                    </div>
                    <div className="giftcardGrid">
                        {this._renderObject()}
                    </div>
                </div>
            );
        } else if(this.state.userInfo) {
            return (
                <div className="redeemWrapper">
                    <div className="balance">
                        <h2>Balance: <span>{this.state.userInfo.points + 'p'}</span></h2>
                    </div>
                    <h1>Loading...</h1>
                </div>
            );
        }
        return (
            <div className="redeemWrapper">
                <h1>Loading...</h1>
            </div>
        );

    }
}

export default RedeemMobile;