import React from "react";
import * as styles from "../common/styles";
import MediaQuery from 'react-responsive';
import PhoneInput from "../common/phoneinput";


class NeverMiss extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (            
            <div style={styles.heroSection} className="col-md-6 my-auto text-left"> 
                <MediaQuery query='(max-width: 768px)'>
                    <div style={styles.heroHeader}> 
                        <p style={styles.titleMobile}> Hate tracking expenses? </p> 
                        <p style={styles.subTitleMobile}> We'll do it for you.</p>

                        <div className="col-md-auto text-center"> 
                            <div style={styles.landingPageInput}>
                                <PhoneInput />
                            </div>
                        </div>
                    </div>
                </MediaQuery>

                <MediaQuery query='(min-width: 769px)'>
                <div style={styles.heroHeaderDesktop}> 
                    <p style={styles.title}> Hate tracking expenses? </p> 
                    <p style={styles.titleMobile}> We'll do it for you.</p>

                    <div style={styles.leftPadding} className="col-md-auto text-left"> 
                        <div style={styles.landingPageInput} className="text-left">
                            <PhoneInput />
                        </div>
                    </div> 
                </div>
                </MediaQuery>

            </div>
        )
    }
}

export default NeverMiss;
