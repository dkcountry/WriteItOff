import React from "react";
import * as styles from "../styles";


class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="footer-content" style={styles.footerStyle} className="container">               
            <div>© Write It Off, 2018</div>
            <div style={styles.footerLinks}>
                <div>
                    <a href="#">Terms </a>
                </div>
                |
                <div>
                    <a href="#">Contact Us </a>
                </div>
            </div>
        </div>
    )}
}


export default Footer;