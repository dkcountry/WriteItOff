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
                                Free, for 6 months
                                </p>

                                <p> 
                                Your personal bookkeeper finds tax write offs among your purchases, and calls you monthly to review your account. Cancel anytime.
                                </p>

                                <hr style={styles.divider}/>

                                <p style={styles.header}> 
                                $195, at tax time
                                </p>

                                <p> 
                                Your personal bookkeeper prepares an year-end expense report (even if you weren’t using keeper the whole year) to easily plug into any tax filing solution.     
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
