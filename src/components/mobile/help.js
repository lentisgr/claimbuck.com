import React from "react";
import Navbar from './navbar.js';
import Header from './header';
import './css/help.css';


class Help extends React.Component {

    render() {
        return (
            <div className={'wrapper'} style={{backgroundColor: '#F6F6F6'}}>

                <div className="faqContainer">
                    <div className="title">
                        <h1>FAQ</h1>
                    </div>
                    <div className="faqQuestions">
                        <ul className={'questionContainer'}>
                            <li style={{color: 'black', fontWeight: 'bold'}}>Q. <span>What is Claimbuck and how does it work?</span>
                            </li>
                            <li><span style={{color: 'black', fontWeight: 'bold',marginLeft:'0'}}>A. </span><span>Claimbuck is a rewards-based community that rewards users for completing offers online. It's very simple, just:<br/><br/>
                            <span style={{color: 'black', fontWeight: 'bold'}}>1. Click on an offer.</span>
                            <br/><br/>
                            <span style={{color: 'black', fontWeight: 'bold'}}>2. Complete the offer.</span>
                            <br/><br/>
                            <span style={{color: 'black', fontWeight: 'bold'}}>3. Redeem your reward.</span>
                            </span></li>
                        </ul>

                        <ul id={'pointNotRecieved'} className={'questionContainer'}>
                            <li style={{color: 'black', fontWeight: 'bold'}}>Q. <span>I completed an offer but did not receive my reward?</span></li>
                            <li><span style={{color: 'black', fontWeight: 'bold',marginLeft:'0'}}>A. </span><span>You may have not received your points for various reasons:<br/><br/>
                                <span style={{color: 'black', fontWeight: 'bold',marginLeft:'0'}}>1. </span>You previously downloaded the app and uninstalled in the past. You will not be rewarded if you've already tried the app on the same device. <br/><br/>
                                <span style={{color: 'black', fontWeight: 'bold',marginLeft:'0'}}>2. </span>You didn't spend enough time in the app. Some offers require that you spend some time within the app. <br/><br/>
                                <span style={{color: 'black', fontWeight: 'bold',marginLeft:'0'}}>3. </span>Points are issued on a delay. Some advertisers issue points on a delay. <br/><br/>
                                <span style={{color: 'black', fontWeight: 'bold',marginLeft:'0'}}>4. </span>You must follow the instructions carefully. Some offers require you to join, reach a certain level, confirm your email etc. Read the instructions carefully. <br/><br/>
                                <span style={{color: 'black', fontWeight: 'bold',marginLeft:'0'}}>5. </span>The app is not compatible with your device. <br/><br/>
                                </span>
                            </li>
                        </ul>

                        <ul className={'questionContainer'}>
                            <li style={{color: 'black', fontWeight: 'bold'}}>Q. <span>When will I receive my reward?</span></li>
                            <li><span style={{color: 'black', fontWeight: 'bold',marginLeft:'0'}}>A. </span><span>Most rewards are received within 24-48 business hours of completing the offer. If you completed an offer and did not receive your reward within these hours see <a
                                href="#pointNotRecieved">here</a></span>
                            </li>
                        </ul>

                        <ul className={'questionContainer'}>
                            <li style={{color: 'black', fontWeight: 'bold'}}>Q. <span>How will I receive my card after I’ve redeemed it?</span></li>
                            <li><span style={{color: 'black', fontWeight: 'bold',marginLeft:'0'}}>A. </span><span>Your card’s code will be sent directly to your account email address upon completing an offer. All rewards are sent within 48 business hours.</span>
                            </li>
                        </ul>

                        <ul className={'questionContainer'}>
                            <li style={{color: 'black', fontWeight: 'bold'}}>Q. <span>How Many Points Do You Need To Redeem A Reward?</span></li>
                            <li><span style={{color: 'black', fontWeight: 'bold',marginLeft:'0'}}>A. </span><span>Our lowest offer starts at 1000 points for a $10 gift card. Make sure you have sufficient points before redeeming.</span>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>


        )
    }
}

export default Help;
