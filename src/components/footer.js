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
                    © Keeper Tax Inc, 2019 | 
                     <a className="text-muted" href="/terms">Terms & Privacy</a> 
                     |  
                     <a className="text-muted" href="mailto:support@keepertax.com">Contact Us</a>
                </div>
            </div>
    )}
}


export default Footer;