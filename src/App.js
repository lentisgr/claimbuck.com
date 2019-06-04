import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import './App.css';

import HelloMobile from './components/mobile/hello';
import HelloDesktop from './components/desktop/hello';

function App() {
    return (
        <div className="App">
            {/*Mobile*/}
            <MediaQuery minDeviceWidth={350} maxDeviceWidth={600}>
                <Router>
                    <Switch>
                        <Route path={'/'} exact={true} component={HelloMobile}/>
                        <Route path={'/earn'}/>
                        <Route path={'/redeem'}/>
                        <Route path={'/social'}/>
                        <Route path={'/help'}/>
                        <Route path={'/login'}/>
                    </Switch>
                </Router>
            </MediaQuery>

            {/*Tablet*/}
            <MediaQuery minDeviceWidth={600}>
                <Router>
                    <Switch>
                        <Route path={'/'} exact={true}/>
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
