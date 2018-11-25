import React from "react";
import * as styles from "../../styles";
import MaskedInput from 'react-text-mask';
import Amplitude from 'react-amplitude';

class HowItWorks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={styles.wideActionCard} > 
                <div className="col-12 my-auto container text-center"> 
                    <p style={styles.title}> how it works</p>
                </div>
                <div className="row align-items-start"> 
                    <div style={styles.howItWorksEmoji} className= "col-3 container text-center">
                        <span role="img" aria-label="phone">📱</span>
                    </div>
                    <div style={styles.howItWorksPadding} className= "col-9 container ">
                        Fill out a quick form on your phone and give keeper read-only access to your purchase history
                    </div>
                    <div style={styles.howItWorksEmoji} className= "col-3 container text-center">
                        <span role="img" aria-label="detective">🕵🏻‍♀️</span>
                    </div>
                    <div style={styles.howItWorksPadding} className= "col-9 container ">
                        Keeper finds tax write offs among your purchases, year round. You'll get occasional clarifying questions over SMS
                    </div>
                    <div style={styles.howItWorksEmoji} className= "col-3 container text-center">
                        <span role="img" aria-label="sheep">🏖️</span>
                    </div>
                    <div style={styles.howItWorksPadding} className= "col-9 container ">
                        At tax time, claim double the write offs (without having to sort through a shoebox of receipts)
                    </div>
                </div>

            </div>
        )
    }
}


export default HowItWorks;
