import React from "react";
import * as styles from "../../styles";
import WriteOffCard from "./writeoffcard";
import MediaQuery from 'react-responsive';
import ImgFile from '../../../public/real-estate-monthly-summary.png';


class WriteOffs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <MediaQuery query='(max-width: 568px)'>
                  <div className="text-center">
                    <img style={styles.expensesImgMobile} src={ImgFile}>
                    </img>
                  </div>
                </MediaQuery>

                <MediaQuery query='(min-width: 569px)'>
                    <div className="text-center"> 
                        <img style={styles.expensesImg} src={ImgFile}>
                        </img>
                    </div>
                </MediaQuery>
            </div>
        )
    }
}


export default WriteOffs;
