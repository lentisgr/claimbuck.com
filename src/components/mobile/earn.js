import React from "react";
import './css/earn.css';

// const testCall = async () => await fetch('https://api.adgatemedia.com/v2/offers?aff=63190&api_key=4040d7f03be1dee659e92e6cdc5c7643', {
//     method: 'GET',
//     headers: {
//         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
//     }
//
// })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });
// testCall();

class Earn extends React.Component {


    render() {
        return (
            <div className={'wrapper'}>

                <div className="offerContainer">
                    <div className="offer">
                        <button> Click me!</button>
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
