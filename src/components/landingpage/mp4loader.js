import React from "react";
import mp4file1 from '../../../public/keeper-1.mp4';
import mp4file2 from '../../../public/keeper-2.mp4';
import mp4file3 from '../../../public/keeper-3.mp4';
import * as styles from "../../styles";
import MediaQuery from 'react-responsive';
import gif from '../../../public/keeper.gif';


class MP4loader extends React.Component {
    render() {
      return (
        <div style={styles.imagePadding} className="col-6 text-center">
            <MediaQuery query='(max-width: 500px)'>
              <img className="logo" src={gif} style={styles.imageWidth}/>
            </MediaQuery>
            <MediaQuery query='(min-width: 501px)'>
              <video webkit-playsinline="true" loop autoPlay muted src={mp4file1} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' style={styles.MP4video} /> 
              <video webkit-playsinline="true" loop autoPlay muted style={styles.MP4video}> 
                <source src={mp4file2} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
              </video>
              <video webkit-playsinline="true" loop autoPlay muted style={styles.MP4video}> 
                <source src={mp4file3} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
              </video>
            </MediaQuery>
        </div>
      );
    }
  }
  
  export default MP4loader;