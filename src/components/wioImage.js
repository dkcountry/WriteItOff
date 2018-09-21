import React from "react";
import WIOIcon from '../../public/wio.jpg';

class WIOImage extends React.Component {
    render() {
      return (
        <div className="WIOImage">
            <img className="logo" src={WIOIcon} />
        </div>
      );
    }
  }
  
  export default WIOImage;