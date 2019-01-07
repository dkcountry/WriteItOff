import React from "react";
import * as styles from "../styles";
import Amplitude from 'react-amplitude';
import PhoneInput from "./phoneinput";

class PhoneSignUp extends React.Component {
    constructor(props) {
        super(props);
        var path_array = window.location.pathname.split("/");
        Amplitude.logEvent('navigation: landing page', {'url': path_array[path_array.length-1]});
    }

    render() {

        return (
            <div id="signup" style={styles.phoneSignup} className="col-12 my-auto text-center"> 
                <div className="row">
                    <div style={styles.phoneSignupDesc} className="col-8 text-center"> 
                        <p style={styles.titleMobileOffset}>Sign up, see it for yourself </p>
                    </div>
                </div>
                <div className="row">
                    <div style={styles.phoneSignupAction} className="col-8 my-auto text-center">

                        <div style={styles.landingPageInput}>
                            <PhoneInput />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default PhoneSignUp;
