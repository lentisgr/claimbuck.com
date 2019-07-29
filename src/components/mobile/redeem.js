import React from "react";
import Cookies from 'universal-cookie';
import ReactImageAppear from 'react-image-appear';
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
            modalEnd: false,
            isValid: false,
            checked: false,
            cookieauthtoken: cookies.get('cookieauthtoken'),
            cookieusername: cookies.get('cookieusername')
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.emailModal = this.emailModal.bind(this);
        this._renderModal = this._renderModal.bind(this);
        this.closeEmailModal = this.closeEmailModal.bind(this);
    }
    componentDidMount() {
        Promise.all([fetch('https://claimbuck.com/web_api/index.php', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'request=userInfo&auth_token=' + this.state.cookieauthtoken + '&username=' + this.state.cookieusername
        }), fetch('https://claimbuck.com/web_api/index.php?&request=giftcardData&auth_token=' + this.state.cookieauthtoken + '&username=' + this.state.cookieusername, {
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
            });
    }


    sendGiftcard() {
        let currentState = this;
        fetch('https://claimbuck.com/web_api/index.php', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'request=sendGiftcard&auth_token=' + this.state.cookieauthtoken + '&username=' + this.state.cookieusername + '&type=' + this.state.modalType + '&value=' + this.state.modalValue + '&points=' + this.state.modalPoints
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if(data.message==='OK') {
                    currentState.setState({
                       isValid: true,
                       checked: true
                    });
                } else {
                    currentState.setState({
                        isValid: false,
                        checked: true
                    });
                }
                currentState.recheckUserInfo();
            });
    }

    recheckUserInfo() {
        let currentState = this;
        fetch('https://claimbuck.com/web_api/index.php', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'request=userInfo&auth_token=' + this.state.cookieauthtoken + '&username=' + this.state.cookieusername
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                currentState.setState({
                   userInfo: data
                });
            });
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
           modalOpen: false,
           modalEnd: false
        });
    }
    closeEmailModal() {
        this.setState({
            modalPoints: 0,
            modalType: '',
            modalValue: 0,
            modalImage: '',
            modalOpen: false,
            modalEnd: false
        });
        window.location = '/landingpage.html';
    }
    emailModal() {
        this.sendGiftcard();
        this.setState({
            modalEnd: true
        });
    }

    _renderModal(){
        if(this.state.modalEnd) {
            if(this.state.checked&&this.state.isValid) {
                return (
                    <div className="redeemModal">
                        <div className="innerModal">
                            <div className="emailContent">
                                <h2>Success!</h2>
                                <h3>The <span>${this.state.modalValue} {this.state.modalType}</span> giftcard will be sent shortly to your email address!</h3>
                                <h3><span>{this.state.modalPoints}p</span> have been deducted from your account.</h3>
                                <button className="modalEmailButton" onClick={this.closeEmailModal}>Close</button>
                            </div>
                        </div>
                    </div>
                );
            } else if(this.state.checked&&!this.state.isValid) {
                return (
                    <div className="redeemModal">
                        <div className="innerModal">
                            <div className="emailContent">
                                <div className="emailError"></div>
                                <h3><span>An error occurred during the process. Don't worry, the points have <span>not</span> been deducted. </span><br/><br/><span>Please try again later!</span></h3>
                                <button className="modalEmailButton" onClick={this.closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="redeemModal">
                        <div className="innerModal">
                            <div className="emailContent">
                                <h2>Loading...</h2>
                            </div>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div className="redeemModal">
                    <div className="innerModal">
                        <div className="content">
                            <div className="contentImgDiv">
                                <ReactImageAppear
                                    placeholderClass="modalPlaceholder"
                                    src={this.state.modalImage}
                                    showLoader={false}
                                />
                            </div>
                            <div className="modalFlex"><h2 className="modalType">{this.state.modalType} ${this.state.modalValue}</h2><h3 className="modalPoints">{this.state.modalPoints}p</h3></div>
                            <p>By redeeming this giftcard you agree to the <a href="https://docs.google.com/document/d/1-EdwdbsOvvLvrn8nbqfuCtONigju_mM6esUFE3B-bnA/edit?usp=sharing" target="_blank">Terms of Service of Claimbuck.com</a>.</p>
                            <button className="modalRedeemButton" onClick={this.emailModal}>Redeem now!</button>
                            <button className="modalCancelButton" onClick={this.closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            );
        }
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
                        <button className={(this.state.userInfo.points>=giftcard.points&&stockClass ? 'redeemButtonOn' : 'redeemButtonOff')}>{giftcard.points + 'p'}</button>
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