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
                    <div style={styles.howItWorksNum} className="col-2 my-auto"> 
                        <p>1</p>
                    </div>
                    <div className="col-10 my-auto"> 
                        <p>
                            <b>5 minute setup.</b> Fill out a quick form and grant keeper read-only access to your purchase history. 
                        </p>
                    </div>
                </div>

                <div style={styles.howItWorksStep} className="row">
                    <div style={styles.howItWorksNum} className="col-2 my-auto"> 
                        <p>2</p>
                    </div>
                    <div className="col-10 my-auto"> 
                        <p>
                            <b>Keeper finds tax write offs for you. </b> 
                             Our bookkeepers review every purchase, asking ocassional clarifying questions over SMS.
                        </p>
                    </div>
                </div>

                <div style={styles.howItWorksStep} className="row">
                    <div style={styles.howItWorksNum} className="col-2 my-auto"> 
                        <p>3</p>
                    </div>
                    <div className="col-10 my-auto"> 
                        <p>
                            <b>Sit back, and save big at tax time. </b>
                             All your tax write offs in one file (rather than a shoe box of receipts).
                        </p>
                    </div>
                </div>
            </div> 
        )
    }
}


export default HowItWorksSteps;                 