import React from "react";
import Navbar from './navbar.js';
import Header from './header';
import './css/help.css';



class Help extends React.Component {

    render() {
        return (
            <div className={'wrapper'} style={{backgroundColor: '#F6F6F6'}}>
                <Header/>

                <div className="faqContainer">
                    <div className="title">
                        <h1>FAQ</h1>
                    </div>
                    <div className="faqQuestions">
                        <ul className={'questionContainer'}>
                            <li>Q. <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, non.</span></li>
                            <li>A. <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos est incidunt neque repellat repellendus sint.</span></li>
                        </ul>

                        <ul className={'questionContainer'}>
                            <li>Q. <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, non.</span></li>
                            <li>A. <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos est incidunt neque repellat repellendus sint.</span></li>
                        </ul>

                        <ul className={'questionContainer'}>
                            <li>Q. <span></span></li>
                            <li>A.</li>
                        </ul>
                    </div>
                </div>


                <Navbar/>
            </div>


        )
    }
}

export default Help;
