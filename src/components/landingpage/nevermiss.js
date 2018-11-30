import React from "react";
import * as styles from "../../styles";
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
                        <p style={styles.titleMobile}> Never miss </p> 
                        <p style={styles.titleMobile}> a tax write off</p>
                    </div>
                </MediaQuery>

                <MediaQuery query='(min-width: 769px)'>
                <div style={styles.heroHeaderDesktop}> 
                    <p style={styles.title}> Never miss </p> 
                    <p style={styles.title}> a tax write off</p>
                </div>
                </MediaQuery>

            </div>
        )
    }
}

export default NeverMiss;
