import React from "react";
import { Link } from "react-router-dom";
import * as styles from "../styles";
import Amplitude from 'react-amplitude';
import KeeperNav from "./LPs/tyrone/nav";


class TyronePricing extends React.Component {
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

                                <p> 
                                <span style={styles.strikethroughHeader}> $10</span> <span style={styles.header}> $8</span> / month
                                </p>

                                <p style={styles.pricingText}> 
                                We love Tyrone and the spunk he brings to self employed tax education ... so Tyrone fans get 20% off of our regular subscription fee, forever.
                                </p>

                                <p style={styles.pricingText}> 
                                The monthly subscription includes daily bookkeeping, and 15 minute calls monthly to review your write offs. Monthly expense reports are forwarded to you and your accountant.
                                </p>
                                
                                <p style={styles.pricingText}> 
                                Note: if you try it and then tell us that you don't love it, we'll refund you and then send you a $30 amazon gift card. Seriously.
                                </p>

                                <div className="col-md-auto text-center"> 
                                    <a href= "/se-tax-guy">
                                        <button style={styles.btnStyle} className="btn btn-primary btn-lg">
                                            sign me up!
                                        </button>
                                    </a>
                                </div> 

                            </div>

                        </div>
                    </div>

                </div>
               
            </div>

        </div>
    )}
}


export default TyronePricing;