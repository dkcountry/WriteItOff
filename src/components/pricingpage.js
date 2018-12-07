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
                                $10 / month
                                </p>

                                <p style={styles.pricingText}> 
                                This includes daily bookkeeping, and 15 minute calls monthly to review your write offs. Export anytime.
                                </p>
                                
                                <p style={styles.pricingText}> 
                                Note: if you try it and then tell us that you don't love it, we'll refund you and then send you a $30 amazon gift card. Seriously.
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
