import React from "react";
import Navbar from './navbar.js';
import Header from './header';

class Redeem extends React.Component {
    render() {
        return (
            <div className={'wrapper'}>
                <Header/>
                <Navbar/>
            </div>


        )
    }
}

export default Redeem;