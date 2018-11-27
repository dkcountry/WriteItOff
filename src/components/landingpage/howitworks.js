import React from "react";
import * as styles from "../../styles";
import MaskedInput from 'react-text-mask';
import Amplitude from 'react-amplitude';
import HowItWorksImg from "../landingpage/howitworksimg";
import HowItWorksSteps from "../landingpage/howitworkssteps";
import MediaQuery from 'react-responsive';

class HowItWorks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={styles.howItWorks} > 
                <div className="col-12 my-auto container text-center"> 
                    <p style={styles.howItWorksTitle}> how it works</p>
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
                        <div className="col-6 text-center">
                            <HowItWorksImg/>
                        </div>
                    </MediaQuery>
                </div>
            </div>
        )
    }
}


export default HowItWorks;
