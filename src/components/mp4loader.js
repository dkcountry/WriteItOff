import React from "react";

import stillImage from '../../public/still-chat.png'

import mp4file1 from '../../public/keeper-1.mp4';
import mp4file2 from '../../public/keeper-2.mp4';
import mp4file3 from '../../public/keeper-3.mp4';

import * as styles from "../styles";


class MP4loader extends React.Component {
    render() {
      return (
        <div>
            <video poster={stillImage} autoPlay autobuffer muted style={styles.MP4video}> 
              <source src={mp4file1} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
            </video>
            <video autoPlay autobuffer muted style={styles.MP4video}> 
              <source src={mp4file2} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
            </video>
            <video autoPlay autobuffer muted style={styles.MP4video}> 
              <source src={mp4file3} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
            </video>
        </div>
      );
    }
  }
  
  export default MP4loader;