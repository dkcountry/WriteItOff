import React from "react";
import * as styles from "../../styles";

class NeverMiss extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (            
            <div className="col-lg-6 my-auto text-center"> 
                <div> 
                    <p style={styles.title}> Never miss a {"\n"} tax write off</p>
                </div>
            </div>
        )
    }
}

export default NeverMiss;
