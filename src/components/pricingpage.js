import React from "react";
import { Link } from "react-router-dom";
import * as styles from "../styles";
import Amplitude from 'react-amplitude';
import KeeperNav from "./nav";
import PhoneInput from "./phoneinput";



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
                                This includes daily bookkeeping, monthly reviews, and everything you need to plug your numbers into TurboTax / H&R Block at tax time.
                                </p>

                                <br/>
                                
                                <div style={styles.landingPageInput} className="text-left">
                                <PhoneInput />
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
               
            </div>

        </div>
    )}
}


export default PricingPage;
