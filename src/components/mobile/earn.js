import React from "react";
import Navbar from './navbar.js';
import Header from './header.js';
import './css/earn.css';






const exampleFetch = async () => {
    const apiKey = 'c09496cc7ea745a2a5b49032d546faf8';
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&from=2019-05-01&to=${today}&sortBy=publishedAt&apiKey=${apiKey}`);
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