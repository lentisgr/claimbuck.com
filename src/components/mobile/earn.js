import React from "react";
import Navbar from './navbar.js';
import Header from './header.js';
import './css/earn.css';






const exampleFetch = async () => {

    const response = await fetch(`claimbuck.com/web_api/index.php`, {
        method: 'POST'
    });
    const data = await response.json();
    console.log(data);
};


class Earn extends React.Component {
    render() {
        return (
            <div className={'wrapper'}>

                <div className="offerContainer">
                    <div className="offer">
                        <button onClick={exampleFetch}>Click me!</button>
                    </div>

                    <div className="offer">

                    </div>

                    <div className="offer">

                    </div>

                    <div className="offer">

                    </div>

                    <div className="offer">

                    </div>
                </div>

            </div>


        )
    }
}

export default Earn;
