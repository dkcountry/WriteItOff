import React from "react";
import * as styles from "../../styles";
import MediaQuery from 'react-responsive';
import gif from '../../../public/keeper.gif';


class HeaderImg extends React.Component {
    render() {
      return (
        <div style={{"textAlign": "center"}} className="col-6">
            <MediaQuery query='(max-width: 768px)'>
              <div>
              </div>
            </MediaQuery>
            <MediaQuery query='(min-width: 769px)'>
                <img style={styles.headerImg} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/google/146/money-with-wings_1f4b8.png"/>
            </MediaQuery>
        </div>
      );
    }
  }
  
  export default HeaderImg;