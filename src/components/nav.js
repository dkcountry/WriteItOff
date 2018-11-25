import React from "react";
import * as styles from "../styles";
import { Link } from "react-router-dom";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
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
                <Navbar color="white" light expand="lg">
                  <NavbarBrand style={styles.title} href="/">keeper</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavLink style={styles.navLink} href="https://blog.keepertax.com">
                            <p >blog</p> 
                        </NavLink>
                        <Link style={styles.navLink} to="/pricing">
                            <p >pricing</p>
                        </Link>
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