import React from "react";
import * as styles from "../../styles";
import MediaQuery from 'react-responsive';
import gif from '../../../public/keeper.gif';
import mp4file from '../../../public/keeper-real-estate.mp4';


class HeaderImg extends React.Component {
    render() {
      return (
        <div style={styles.imagePadding} className="col-6">
            <MediaQuery query='(max-width: 768px)'>
              <div>
              </div>
            </MediaQuery>
            <MediaQuery query='(min-width: 769px)'>
                <video webkit-playsinline="true" autoPlay muted src={mp4file} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' style={styles.MP4video} />
            </MediaQuery>
        </div>
      );
    }
  }
  
  export default HeaderImg;