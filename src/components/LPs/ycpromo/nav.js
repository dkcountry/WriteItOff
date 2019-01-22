import React from "react";
import * as styles from "../../../styles";
import { Link } from "react-router-dom";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


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
                  <NavbarBrand style={styles.logo} href="/yc-promo">
                        <img style={styles.logoIcon} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/google/146/money-with-wings_1f4b8.png"/>
                        keeper

                        | &#8239;

                        
                        <img style={styles.partnerLogoScooter} src="https://www.ycombinator.com/images/ycombinator-logo-fb889e2e.png"/>

                  </NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavLink style={styles.navLink} href="https://blog.keepertax.com">
                            <p >blog</p> 
                        </NavLink>
                        <Link style={styles.navLink} to="/login">
                            <p >log in</p>
                        </Link>
                    </Nav>
                  </Collapse>
                </Navbar>
            </div>
    )}
}


export default KeeperNav;