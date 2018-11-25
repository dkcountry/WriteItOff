import React from "react";
import { Link } from "react-router-dom";
import * as styles from "../styles";
import MP4loader from "./landingpage/mp4loader";
import PhoneSignUp from "./landingpage/phonesignup";
import KeeperNav from "./nav";
import NeverMiss from "./landingpage/nevermiss";
import HowItWorks from "./landingpage/howitworks";
import WriteOffs from "./landingpage/writeoffs";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div style={styles.outerContainer} className="container">
            < KeeperNav />

            <div style={styles.containerStyle} className="container row align-items-start"> 
                <NeverMiss />
                <MP4loader/>
                <HowItWorks />
                <WriteOffs />
                <PhoneSignUp />
            </div>
        </div>
    )}
}


export default LandingPage;
