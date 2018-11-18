import React from "react";
import * as styles from "../styles";


class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={styles.footer} className="navbar text-center navbar-fixed-bottom">
                <div className="text-muted text-center col-12">
                    © Keeper, 2018 | 
                    <a className="text-muted" href="#"> Terms </a>
                     |  
                    <a className="text-muted" href="#"> Contact Us </a>
                </div>
            </div>
    )}
}


export default Footer;