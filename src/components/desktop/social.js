import React from "react";
import './css/social.css';


class Social extends React.Component {
    render() {
        return (
            <div className={'wrapper'}>
                <div className="socialContainer" style={{
                    maxWidth: '750px'
                }}>
                    <div className="discordBanner" style={{
                        transform: 'TranslateY(25px)',
                        maxWidth: '700px',
                        height: '300px'
                    }}>

                    </div>
                </div>
            </div>
        )
    }
}

export default Social;