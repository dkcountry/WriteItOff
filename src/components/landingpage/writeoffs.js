import React from "react";
import * as styles from "../../styles";
import WriteOffCard from "./writeoffcard";
import MediaQuery from 'react-responsive';
import ImgFile from '../../../public/real-estate-monthly-summary.png';


class WriteOffs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={styles.writeOffsSection}>
                <p style={styles.titleMobileOffset}> tax write offs <img style={styles.logoIcon} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/google/146/money-with-wings_1f4b8.png"/>keeper looks for: </p>
                <MediaQuery query='(max-width: 568px)'>
                  <div className="text-center">
                    <img style={styles.expensesImgMobile} src="https://storage.googleapis.com/titanium-diode-208122.appspot.com/real-estate-write-offs-narrow.png">
                    </img>
                  </div>
                </MediaQuery>

                <MediaQuery query='(min-width: 569px)'>
                    <div className="text-center"> 
                        <img style={styles.expensesImg} src="https://storage.googleapis.com/titanium-diode-208122.appspot.com/real-estate-agent-writeoffs.png">
                        </img>
                    </div>
                </MediaQuery>
            </div>
        )
    }
}


export default WriteOffs;
