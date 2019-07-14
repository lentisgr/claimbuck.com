import React from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Redeem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: null,
            giftcardData: {},
            modalPoints: 0,
            modalType: '',
            modalValue: 0,
            modalImage: '',
            modalOpen: false,
            cookieauthtoken: cookies.get('cookieauthtoken'),
            cookieusername: cookies.get('cookieusername')
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this._renderModal = this._renderModal.bind(this);
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

    openModal(type,value,points,img,instock) {
        if(this.state.userInfo.points>=points&&instock) {
            this.setState({
                modalPoints: points,
                modalType: type,
                modalValue: value,
                modalImage: img,
                modalOpen: true
            });
        }
    }
    closeModal() {
        this.setState({
           modalPoints: 0,
           modalType: '',
           modalValue: 0,
           modalImage: '',
           modalOpen: false
        });
    }

    _renderModal(){
        return (
            <div className="redeemModal" onClick={() => this.closeModal()}>
                <div className="innerModal">
                    <div className="content">
                        <img src={this.state.modalImage} alt=""/>
                        <div className="modalFlex"><h2 className="modalType">{this.state.modalType} ${this.state.modalValue}</h2><h3 className="modalPoints">{this.state.modalPoints}p</h3></div>
                        <p>By redeeming this giftcard you agree to the Terms of Service of Claimbuck.com</p>
                    </div>
                </div>
            </div>
        );
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
                <div key={i} className="giftcard" onClick={() => this.openModal(giftcard.type,giftcard.value,giftcard.points,giftcard.image_url,stockClass)}>
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
            if(this.state.modalOpen) {
                return (
                    <div className="redeemWrapper">
                        <div className="balance">
                            <h2>Balance: <span>{this.state.userInfo.points + 'p'}</span></h2>
                        </div>
                        <div className="giftcardContainer">
                            {this._renderObject()}
                        </div>
                        {this._renderModal()}
                    </div>
                );
            } else {
                return (
                    <div className="redeemWrapper">
                        <div className="balance">
                            <h2>Balance: <span>{this.state.userInfo.points + 'p'}</span></h2>
                        </div>
                        <div className="giftcardContainer">
                            {this._renderObject()}
                        </div>
                    </div>
                );
            }

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

export default Redeem;