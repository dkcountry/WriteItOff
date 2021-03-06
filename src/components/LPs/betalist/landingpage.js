import React from "react";
import MediaQuery from 'react-responsive';
import * as styles from "../common/styles";
import KeeperNav from "./nav";
import Hero from "./hero";
import WriteOffs from "./writeoffs";
import HeroImg from "./heroImg";
import HowItWorks from "../common/howitworks";
import PhoneSignUp from "../common/phonesignup";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div style={styles.outerContainer} className="container">
            < KeeperNav />

            <MediaQuery query='(max-width: 768px)'>

                <div> 
                    <HeroImg />
                </div> 

                <div> 
                    <Hero />
                </div> 
            </MediaQuery>

            <MediaQuery query='(min-width: 769px)'>

                <div style={styles.heroPaddingMargin} className="col-12 row align-items-start"> 
                    <Hero />
                    <HeroImg />
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


export default LandingPage;
