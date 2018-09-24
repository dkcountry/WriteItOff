import React from "react";
import WIOIcon from '../../public/wio.jpg';
import * as styles from "../styles";


class WIOImage extends React.Component {
    render() {
      return (
        <div className="WIOImage">
            <img className="logo" src={WIOIcon} style={styles.imageWidth}/>
        </div>
      );
    }
  }
  
  export default WIOImage;