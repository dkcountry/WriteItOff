import React from "react";
import mp4file1 from '../../../public/keeper-1.mp4';
import mp4file2 from '../../../public/keeper-2.mp4';
import mp4file3 from '../../../public/keeper-3.mp4';
import * as styles from "../../styles";
import MediaQuery from 'react-responsive';
import gif from '../../../public/keeper.gif';


class HeaderImg extends React.Component {
    render() {
      return (
        <div style={styles.imagePadding} className="col-6 text-center">
            <MediaQuery query='(max-width: 768px)'>
              <div>
              
              </div>
            </MediaQuery>
            <MediaQuery query='(min-width: 769px)'>
              <div className="text-center">
                <img style={styles.headerImg} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/google/146/money-with-wings_1f4b8.png"/>
              </div>
            </MediaQuery>
        </div>
      );
    }
  }
  
  export default HeaderImg;