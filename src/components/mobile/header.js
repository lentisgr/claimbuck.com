import logo from "../../images/image0.png";
import React from "react";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <img className={'headerLogo'} src={logo} alt=""/>
            </div>)
    }
}

export default Header;