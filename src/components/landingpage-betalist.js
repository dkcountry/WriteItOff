import React from "react";
import { Link } from "react-router-dom";
import * as styles from "../styles";
import MP4loader from "./landingpage-betalist/mp4loader";
import PhoneSignUp from "./landingpage-betalist/phonesignup";
import KeeperNav from "./nav";
import NeverMiss from "./landingpage-betalist/nevermiss";
import HowItWorks from "./landingpage-betalist/howitworks";
import WriteOffs from "./landingpage-betalist/writeoffs";
import HeaderImg from "./landingpage-betalist/headerImg";
import MediaQuery from 'react-responsive';

class LandingPageBetaList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div style={styles.outerContainer} className="container">
            < KeeperNav />

            <MediaQuery query='(max-width: 768px)'>

                <div> 
                    <HeaderImg />
                </div> 

                <div> 
                    <NeverMiss />
                </div> 
            </MediaQuery>

            <MediaQuery query='(min-width: 769px)'>

                <div style={styles.heroPaddingMargin} className="col-12 row align-items-start"> 
                    <NeverMiss />
                    <HeaderImg />
                </div>

            </MediaQuery>

            <div>
                <HowItWorks />
            </div>
            <div style={styles.imageBackgroundColor} >
                <WriteOffs />
            </div>
            <div>
                <PhoneSignUp />
            </div>
        </div>
    )}
}


export default LandingPageBetaList;