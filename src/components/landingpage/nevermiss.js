import React from "react";
import * as styles from "../../styles";

class NeverMiss extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (            
            <div style={styles.heroSection} className="col-md-6 my-auto text-left"> 
                <div style={styles.heroHeader}> 
                    <p style={styles.title}> Never miss </p> 
                    <p style={styles.title}> a tax write off</p>
                </div>
            </div>
        )
    }
}

export default NeverMiss;
