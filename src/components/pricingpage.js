import React from "react";
import { Link } from "react-router-dom";
import * as styles from "../styles";
import Amplitude from 'react-amplitude';
import KeeperNav from "./nav";


class PricingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            phone: '',
            isLoading: false
        };
        Amplitude.logEvent('navigation: pricing page');
    }

    render() {
        let loadingView = <div></div>
        if (this.state.isLoading) {
            loadingView = <div>We just sent you a text message!</div>
        }

        return (
        <div style={styles.outerContainer} className="container">
            <KeeperNav />
            <div style={styles.containerStyle} className="container">
                
                <div className="row align-items-start">

                    <div style={styles.actionCardPricing} className="col-8 my-auto" >

                        <div className="container"> 

                            <div> 

                                <p style={styles.header}> 
                                1 month free trial
                                </p>

                                <p> 
                                Your personal bookkeeper finds tax write offs among your purchases, and records them for a year-end expense report. Cancel anytime.
                                </p>

                                <hr style={styles.divider}/>

                                <p style={styles.header}> 
                                $9.99/month after
                                </p>

                                <p> 
                                We will call you monthly to review your account, and we'll stay on top of any changes in your work.     
                                </p>

                                <hr style={styles.divider}/>

                                <p style={styles.header}> 
                                The bottom line
                                </p>

                                <p>
                                On average, people with keeper report claiming $1,342 in tax write offs they would have missed otherwise.
                                </p>
                            
                            </div>

                        </div>
                    </div>

                </div>
               
            </div>

        </div>
    )}
}


export default PricingPage;
