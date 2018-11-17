import React from "react";
import { Link } from "react-router-dom";
import * as styles from "../styles";
import Amplitude from 'react-amplitude';
import WIOImage from "./wioImage";
import MaskedInput from 'react-text-mask';
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

class PricingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            phone: '',
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
            this.state = {
              isOpen: false
            };
        Amplitude.logEvent('navigation: landing page');
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen});
    }
    
    handleChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    
    handleSubmit(event) {
        this.setState({isLoading: true});
        fetch('http://penguin.linux.test:5000/welcome-sms', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstname: this.state.firstname,
                phone: this.state.phone,
              })
        }).then(results => {
            return results.json();
        }).then(data => {
            this.props.loginCallback(data)
        });
        event.preventDefault();
        Amplitude.init('212ed2feb2663c8004ae16498974992b', this.state.phone);
        Amplitude.logEvent('onboarding: input name and number');
    }

    render() {
        let loadingView = <div></div>
        if (this.state.isLoading) {
            loadingView = <div>We just sent you a text message!</div>
        }

        return (
        <div style={styles.outerContainer} className="container">

            <div>
                <Navbar color="white" light expand="lg">
                  <NavbarBrand style={styles.title} href="/">keeper</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                        <NavLink style={styles.activeNavLink} href="/pricing">pricing</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink style={styles.navLink} href="/index.html">log in</NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </Navbar>
            </div>

            <div style={styles.containerStyle} className="container">
                
                <div className="row align-items-start">

                    <div style={styles.actionCardPricing} className="col-8 my-auto" >

                        <div className="container"> 

                            <div> 

                                <p style={styles.header}> 
                                Free, for 6 months
                                </p>

                                <p> 
                                Your personal bookkeeper finds tax write offs among your purchases, and calls you monthly to review your account. Cancel anytime.
                                </p>

                                <hr style={styles.divider}/>

                                <p style={styles.header}> 
                                $195, at tax time
                                </p>

                                <p> 
                                Your personal bookkeeper prepares an year-end expense report (even if you weren’t using keeper the whole year) to easily plug into any tax filing solution.     
                                </p>

                                <hr style={styles.divider}/>

                                <p style={styles.header}> 
                                The bottom line
                                </p>

                                <p>
                                On average, people with keeper report claiming $1,342 in tax write offs they would have missed otherwise.
                                </p>
                            
                            </div>

                        </div>
                    </div>

                </div>
               
            </div>

        </div>
    )}
}


export default PricingPage;
