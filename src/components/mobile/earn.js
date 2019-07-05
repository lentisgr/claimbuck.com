import React, {useState} from "react";
import './css/earn.css';

const Earn = () => {

    const [wall, setWall] = useState('https://wall.adgaterewards.com/nqqYrw/jdWkfKAAkUZCkG8skR9nRGtJ37SgvGg4T5eJCngnkNZ2YAYHEY26qKTT6VnaXCwy');

    const changeToWall_1 = function () {
        setWall('https://wall.adgaterewards.com/nqqYrw/jdWkfKAAkUZCkG8skR9nRGtJ37SgvGg4T5eJCngnkNZ2YAYHEY26qKTT6VnaXCwy');
    };

    const changeToWall_2 = function () {
        setWall('https://www.offertoro.com/ifr/show/19322/USER_ID/8063');
    };

    return (
        <div className={'wrapper'}>

            <nav role="navigation" className={'offerMenu'}>
                <button id={'changeWall_1'} onClick={changeToWall_1}>
                    Offerwall 1
                </button>
                <button id={'changeWall_2'} onClick={changeToWall_2}>
                    Offerwall 2
                </button>
            </nav>

            <div className="offerContainer">
                <iframe title={'offerwall1'} className={'offerwall1'} src={wall}> </iframe>
            </div>

        </div>


    )
};


export default Earn;
