import React from "react";
import * as styles from "../../../styles";
import MediaQuery from 'react-responsive';


class HeaderImg extends React.Component {
    render() {
      return (
        <div style={styles.imagePadding} className="col-6">
            <img src="https://storage.googleapis.com/titanium-diode-208122.appspot.com/main-sms.gif" style={styles.MP4video} />
        </div>
      );
    }
  }
  
  export default HeaderImg;