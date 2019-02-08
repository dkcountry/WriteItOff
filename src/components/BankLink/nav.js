import React from "react";
import * as styles from "../../styles";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink} from 'reactstrap';
import { Link } from "react-router-dom";


class KeeperNav extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <div>
            <Navbar color="#F7F7F7" light expand="lg">
              <NavbarBrand style={styles.logo} href="/">
                    <img style={styles.logoIcon} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/google/146/money-with-wings_1f4b8.png"/>
                    keeper
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <Link style={styles.navLink} to="/dashboard">
                            <p>dashboard</p>
                    </Link>
                    <NavLink style={styles.navLink} href="https://keepertax.com">
                        <p >log out</p>
                    </NavLink>
                </Nav>
              </Collapse>
            </Navbar>
        </div>
    )}
}


export default KeeperNav;