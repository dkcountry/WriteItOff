import React from "react";
import * as styles from "../../styles";
import Amplitude from 'react-amplitude';

class HowItWorksSteps extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (

            <div style={styles.howItWorksSteps} className="row align-items-start my-auto">
                <div style={styles.howItWorksStep} className="row">
                    <div className="col-3 my-auto"> 
                        <img style={styles.howItWorksIcon} src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/146/speech-balloon_1f4ac.png'/>
                    </div>
                    <div className="col-9 my-auto"> 
                        <p>
                            <b>Tell Keeper about your work. </b> <br/> Do you travel for work? Do you work from home? Takes 5 minutes. 
                        </p>
                    </div>
                </div>

                <div style={styles.howItWorksStep} className="row">
                    <div className="col-3 my-auto"> 
                        <img style={styles.howItWorksIcon} src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/146/credit-card_1f4b3.png'/>
                    </div>
                    <div className="col-9 my-auto"> 
                        <p>
                            <b>Grant read-access to your purchase history.</b> <br/> Private, secure, and far less work than tracking paper receipts.  
                        </p>
                    </div>
                </div>

                <div style={styles.howItWorksStep} className="row">
                    <div className="col-3 my-auto"> 
                        <img style={styles.howItWorksIcon} src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/146/left-pointing-magnifying-glass_1f50d.png'/>
                    </div>
                    <div className="col-9 my-auto"> 
                        <p>
                            <b>Keeper finds you tax write offs.  </b> <br/>
                             Keeper reviews every purchase, asking ocassional clarifying questions over SMS.
                        </p>
                    </div>
                </div>
            </div> 
        )
    }
}


export default HowItWorksSteps;                 