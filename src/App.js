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
import Navbar from './components/mobile/navbar';
import Header from './components/mobile/header';
//desktop import
import helpDesktop from './components/desktop/help'
import homeDesktop from './components/desktop/home';
import NavbarDesktop from './components/desktop/navbarDesktop';
import socialDesktop from './components/desktop/social'
import earnDesktop from './components/desktop/earn';
import redeemDesktop from './components/desktop/redeem';
//tablet import
import iNoBounce from 'inobounce';

function App() {
    return (
        <div className="App">
            {/*Mobile*/}
            <MediaQuery minDeviceWidth={300} maxDeviceWidth={992}>
                <Router>
                    <Switch>
                        <div className="wrapper">
                            <Header/>
                            <SwipeableRoutes>
                                <Route path={'/'} exact={true} component={HomeMobile}/>
                                <Route path={'/earn'} component={EarnMobile}/>
                                <Route path={'/redeem'} component={RedeemMobile}/>
                                <Route path={'/social'} component={SocialMobile}/>
                                <Route path={'/help'} component={HelpMobile}/>
                            </SwipeableRoutes>
                            <Navbar/>
                        </div>
                    </Switch>
                </Router>
            </MediaQuery>

            {/*/!*Tablet*!/*/}
            {/*<MediaQuery minDeviceWidth={600} maxDeviceWidth={992}>*/}
            {/*    <Router>*/}
            {/*        <Switch>*/}
            {/*            <Route path={'/'} exact={true} component={HelloTablet}/>*/}
            {/*            <Route path={'/earn'}/>*/}
            {/*            <Route path={'/redeem'}/>*/}
            {/*            <Route path={'/social'}/>*/}
            {/*            <Route path={'/help'}/>*/}
            {/*            <Route path={'/login'}/>*/}
            {/*        </Switch>*/}
            {/*    </Router>*/}
            {/*</MediaQuery>*/}

            {/*Desktop*/}
            <MediaQuery minDeviceWidth={992}>
                <Router>
                    <Switch>
                        <div className="wrapper">
                            <NavbarDesktop/>
                            <Route path={'/'} exact={true} component={homeDesktop}/>
                            <Route path={'/earn'} component={earnDesktop} />
                            <Route path={'/redeem'} component={redeemDesktop} />
                            <Route path={'/social'} component={socialDesktop}/>
                            <Route path={'/help'} component={helpDesktop}/>
                            <Route path={'/login'}/>
                        </div>
                    </Switch>
                </Router>
            </MediaQuery>
        </div>
    );
}

export default App;
