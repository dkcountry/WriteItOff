import React from "react";
import mp4file1 from '../../../public/keeper-1.mp4';
import mp4file2 from '../../../public/keeper-2.mp4';
import mp4file3 from '../../../public/keeper-3.mp4';
import * as styles from "../../styles";
import MediaQuery from 'react-responsive';
import gif from '../../../public/keeper.gif';


class HowItWorksImg extends React.Component {
    render() {
      return (
        <div className="col-6 text-center">
            <div style={styles.howItWorksImage} className="text-center">
              <video webkit-playsinline="true" autoPlay muted src={mp4file1} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' style={styles.MP4video} /> 
              <video webkit-playsinline="true" autoPlay muted style={styles.MP4video}> 
                <source src={mp4file2} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
              </video>
              <video webkit-playsinline="true" autoPlay muted style={styles.MP4video}> 
                <source src={mp4file3} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
              </video>
            </div>
        </div>
      );
    }
  }
  
  export default HowItWorksImg;