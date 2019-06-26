import React from 'react';
import './css/home.css';
import insightIcon from "../../images/insight icon.svg";

class home extends React.Component {
    render() {
        return(
            <div className="desktopContainer">
                <div className="desktopWelcomeMessage">
                    Hello
                </div>
                <div className="desktopInsights">
                    <div className="desktopInsightsContainer">
                        <div className="desktopInsightsHeader">
                            <h1><span className={'icon'}><img src={insightIcon} alt=""/></span>Insights</h1>
                        </div>
                        <div className="desktopInsightsContent">
                            <div className="desktopInsightsText">
                                <ul>
                                    <li>Balance:</li>
                                    <li>Earnings:</li>
                                    <li>Offers completed:</li>
                                </ul>
                            </div>
                            <div className="desktopInsightsData">
                                <ul>
                                    <li className={'balance'}>1000</li>
                                    <li>10</li>
                                    <li>10</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default home;