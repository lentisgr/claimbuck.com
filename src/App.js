import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import SwipeableRoutes from "react-swipeable-routes";
import './App.css';
//mobile import
import HomeMobile from './components/mobile/home';
import HelpMobile from './components/mobile/help';
import EarnMobile from './components/mobile/earn';
import RedeemMobile from './components/mobile/redeem';
import SocialMobile from './components/mobile/social';
//desktop import
import HelloDesktop from './components/desktop/hello';
//tablet import
import HelloTablet from './components/tablet/hello';

function App() {
    return (
        <div className="App">
            {/*Mobile*/}
            <MediaQuery minDeviceWidth={350} maxDeviceWidth={600}>
                <Router>
                    <Switch>
                        <SwipeableRoutes>
                            <Route path={'/'} exact={true} component={HomeMobile}/>
                            <Route path={'/earn'} component={EarnMobile}/>
                            <Route path={'/redeem'} component={RedeemMobile}/>
                            <Route path={'/social'} component={SocialMobile}/>
                            <Route path={'/help'} component={HelpMobile}/>
                            <Route path={'/login'}/>
                        </SwipeableRoutes>
                    </Switch>
                </Router>
            </MediaQuery>

            {/*Tablet*/}
            <MediaQuery minDeviceWidth={600} maxDeviceWidth={992}>
                <Router>
                    <Switch>
                        <Route path={'/'} exact={true} component={HelloTablet}/>
                        <Route path={'/earn'}/>
                        <Route path={'/redeem'}/>
                        <Route path={'/social'}/>
                        <Route path={'/help'}/>
                        <Route path={'/login'}/>
                    </Switch>
                </Router>
            </MediaQuery>

            {/*Desktop*/}
            <MediaQuery minDeviceWidth={992}>
                <Router>
                    <Switch>
                        <Route path={'/'} exact={true} component={HelloDesktop}/>
                        <Route path={'/earn'}/>
                        <Route path={'/redeem'}/>
                        <Route path={'/social'}/>
                        <Route path={'/help'}/>
                        <Route path={'/login'}/>
                    </Switch>
                </Router>
            </MediaQuery>
        </div>
    );
}

export default App;
