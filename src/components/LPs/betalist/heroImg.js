import React from "react";
import * as styles from "../common/styles";
import MediaQuery from 'react-responsive';


class HeaderImg extends React.Component {
    render() {
      return (
        <div style={styles.imagePadding} className="col-6">
            <MediaQuery query='(max-width: 768px)'>
              <div>
                  <img src="https://storage.googleapis.com/titanium-diode-208122.appspot.com/keeper-real-estate.gif" style={styles.MP4video} />
              </div>
            </MediaQuery>
            <MediaQuery query='(min-width: 769px)'>
                <video webkit-playsinline="true" autoPlay muted src="https://storage.googleapis.com/titanium-diode-208122.appspot.com/keeper-real-estate.mp4" style={styles.MP4video} />
            </MediaQuery>
        </div>
      );
    }
  }
  
  export default HeaderImg;