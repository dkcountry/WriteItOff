import React from "react";
import * as styles from "../../styles";
import MediaQuery from 'react-responsive';


class NeverMiss extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (            
            <div style={styles.heroSection} className="col-md-6 my-auto text-left"> 
                <MediaQuery query='(max-width: 768px)'>
                    <div style={styles.heroHeader}> 
                        <p style={styles.titleMobile}> Effortless tax write offs </p> 
                        <p style={styles.titleMobile}> for real estate agents</p>
                        <div className="col-md-auto text-center"> 
                            <button style={styles.btnStyle} href="#signup" className="btn btn-primary btn-lg">
                                join the waitlist
                            </button> 
                            <p style={styles.subtext}> service currently at capacity. </p>
                        </div> 
                    </div>
                </MediaQuery>

                <MediaQuery query='(min-width: 769px)'>
                <div style={styles.heroHeaderDesktop}> 
                    <p style={styles.title}> Effortless tax write offs </p> 
                    <p style={styles.title}> for real estate agents</p>
                    <div className="col-md-auto text-center"> 
                        <form action="#signup">
                            <button style={styles.btnStyle} link="#signup" className="btn btn-primary btn-lg">
                                join the waitlist
                            </button>
                        </form>
                        <p style={styles.subtext}> service currently at capacity. </p>
                    </div> 
                </div>
                </MediaQuery>

            </div>
        )
    }
}

export default NeverMiss;
