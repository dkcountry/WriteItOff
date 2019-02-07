import React from "react";
import * as styles from "../common/styles";
import MediaQuery from 'react-responsive';


class NeverMiss extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (            
            <div style={styles.heroSection} className="col-md-6 my-auto text-left"> 
                <MediaQuery query='(max-width: 768px)'>
                    <div style={styles.heroHeader}> 
                        <p style={styles.titleMobile}> AI tax bookkeeper </p> 
                        <p style={styles.subTitleMobile}> for real estate agents</p>

                        <p style={styles.subtextMobile}>Keeper finds you tax write offs among your purchase history. It’s like having a personal bookkeeper. </p>

                        <div className="col-md-auto text-center"> 
                            <button style={styles.btnStyle} link="#signup" className="btn btn-primary btn-lg">
                                request access
                            </button> 
                        </div>
                    </div>
                </MediaQuery>

                <MediaQuery query='(min-width: 769px)'>
                <div style={styles.heroHeaderDesktop}> 
                    <p style={styles.title}> AI tax bookkeeper </p> 
                    <p style={styles.titleMobile}> for real estate agents</p>

                    <p style={styles.subtextMobile}>Keeper finds write offs among your purchases. It’s like having a personal bookkeeper. </p>

                    <div style={styles.leftPadding} className="col-md-auto text-left"> 
                        <form action="#signup">
                            <button style={styles.btnStyle} link="#signup" className="btn btn-primary btn-lg">
                                request access
                            </button>
                        </form>
                    </div> 
                </div>
                </MediaQuery>

            </div>
        )
    }
}

export default NeverMiss;
