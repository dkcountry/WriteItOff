import React from "react";
import mp4file from '../../public/keeper.mp4';
import mp4file1 from '../../public/keeper-1.mp4';
import mp4file2 from '../../public/keeper-2.mp4';
import mp4file3 from '../../public/keeper-3.mp4';
import * as styles from "../styles";


class MP4loader extends React.Component {
    render() {
      return (
        <div>
            <video src={mp4file1} type="video/mp4" autoPlay style={styles.MP4video}></video>
            <video src={mp4file2} type="video/mp4" autoPlay style={styles.MP4video}></video>
            <video src={mp4file3} type="video/mp4" autoPlay style={styles.MP4video}></video>
        </div>
      );
    }
  }
  
  export default MP4loader;