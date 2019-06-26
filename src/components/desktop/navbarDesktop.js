import logo from "../../images/image0.png";
import React from "react";
import {NavLink} from "react-router-dom";
import './css/desktopNavbar.css';

class navbarDesktop extends React.Component {
    render() {
        return (
            <div className="desktopNavbar">
                <div className="logoContainer">
                    <NavLink to={'/'}><img className={'desktopNavbarLogo'} src={logo} alt=""/></NavLink>

                </div>

                <ul className={'navItems'}>
                    <NavLink to={'/help'} className={'navLinkHelp'} activeClassName={'navLinkHelpActive'}>
                        <li>Help</li>
                    </NavLink>
                    <NavLink to={'/'} exact={true} className={'navLinkHome'} activeClassName={'navLinkHomeActive'}>
                        <li>Home</li>
                    </NavLink>
                    <NavLink to={'/earn'} className={'navLinkEarn'} activeClassName={'navLinkEarnActive'}>
                        <li>Earn</li>
                    </NavLink>
                    <NavLink to={'/redeem'} className={'navLinkRedeem'} activeClassName={'navLinkRedeemActive'}>
                        <li>Redeem</li>
                    </NavLink>
                    <NavLink to={'/social'} className={'navLinkSocial'} activeClassName={'navLinkSocialActive'}>
                        <li>Social</li>
                    </NavLink>
                </ul>
            </div>)
    }
}

export default navbarDesktop;