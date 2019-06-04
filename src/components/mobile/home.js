import React from 'react'
import './css/home.css'
import {NavLink} from 'react-router-dom';
import Navbar from './navbar.js'
import Header from './header';

//image import
import logo from '../../images/image0.png';
import insightIcon from '../../images/insight icon.svg';

let username = 'XRaider';

class Home extends React.Component {
    render() {
        return(
            <div className={'wrapper'}>
               <div className="header">
                   <img className={'headerLogo'} src={logo} alt=""/>
               </div>
                <div className="welcomeMessage">
                    Hey, {username} <br/> Welcome back!
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
                                <li className={'balance'}>1000</li>
                                <li>10</li>
                                <li>10</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Navbar/>

            </div>
        )
    }
}

export default Home;