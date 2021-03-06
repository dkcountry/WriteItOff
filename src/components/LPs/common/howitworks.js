import React from "react";
import * as styles from "./styles";
import HowItWorksSteps from "./howitworkssteps";
import MediaQuery from 'react-responsive';

class HowItWorks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={styles.howItWorks} > 
                <div className="col-12 my-auto container text-center"> 
                    <p style={styles.howItWorksTitle}> How it works:</p>
                </div>

                <div className="row"> 
                    <MediaQuery query='(max-width: 1068px)'>
                        <div style={styles.centeringContainer} className="col-12 my-auto text-left">
                            <HowItWorksSteps/>
                        </div>
                    </MediaQuery>

                    <MediaQuery query='(min-width: 1069px)'>
                        <div style={styles.centeringContainer} className="col-6 my-auto text-left">
                            <HowItWorksSteps/>
                        </div>
                    </MediaQuery>
                </div>
            </div>
        )
    }
}


export default HowItWorks;
