import PlaidLink from 'react-plaid-link';
import React from "react";
import { Link } from 'react-router-dom';
import * as styles from "../styles";
import Amplitude from 'react-amplitude';
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


const PLAID_PUBLIC_KEY = "36bd55c50f7421ae5ef190a4fa03fd";


class PlaidFace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            institutionName: null,
            institutionId: null,
            accountId: null,
            accountType: null,
            accountSubType: null,
            allBanks: []
        }
        this.metadataCallback = this.metadataCallback.bind(this);
        this.handleOnSuccess = this.handleOnSuccess.bind(this);
        this.getBankSummary = this.getBankSummary.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
            this.state = {
              isOpen: false
            };
        Amplitude.init('212ed2feb2663c8004ae16498974992b', this.props.phone);
        Amplitude.setUserProperties({'phone number': this.props.phone, 'firstname': this.props.firstname, 'lastname': this.props.lastname});
        Amplitude.logEvent('navigation: dashboard');
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen});
    }

    handleSubmit(event) {
        Amplitude.logEvent('log out');        
        Amplitude.resetUserId();
        this.props.logoutCallback();
    }

    metadataCallback(metadata) {
        this.setState({ institutionName: metadata.institution.name });
        this.setState({ institutionId: metadata.institution.institution_id });
        this.setState({ accountId: metadata.accounts.id });
        this.setState({ accountType: metadata.accounts.type });
        this.setState({ accountSubType: metadata.accounts.subtype });
    }

    getBankSummary(props) {
        fetch('https://writeitoff.herokuapp.com/get_bank_summary', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                phone: props.phone,
                password: props.userToken
              })
        }).then(results => {
            return results.json();
        }).then(data => {
            const accts = [];
            for (let acct in data) {
                accts.push(data[acct]["institution_name"])
            }
            this.setState({allBanks: [...accts]})
        })
    }

    componentWillReceiveProps(nextProps) {
        this.getBankSummary(nextProps)
    }

    handleOnSuccess(publicToken, metadata) {
        this.metadataCallback(metadata);
        this.getAccessToken(publicToken);
        Amplitude.logEvent('bank account linked');        
    }

    getAccessToken(publicToken) {
        fetch('https://writeitoff.herokuapp.com/get_access_token', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                public_token: publicToken,
                phone: this.props.phone,
                institution_name: this.state.institutionName,
                institution_id: this.state.institutionId,
                account_id: this.state.accountId,
                account_type: this.state.accountType,
                account_subtype: this.state.accountSubType
              })
        }).then(results => {
            return results.json();
        }).then(data => {
            this.getBankSummary(this.props)
        });
        event.preventDefault();
    }

    render() {
        const viewBanks = [];
        for (let bank in this.state.allBanks) {
            viewBanks.push(
                <div  key={bank} style={styles.bankCard} className="card text-left col-12">
                    <div className="card-body">
                        <h5 className="card-title">
                            {this.state.allBanks[bank]}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            All debit and credit card purchases included.
                        </h6>
                    </div>
                </div>
            )
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
                            <NavLink style={styles.navLink} href="/">logout</NavLink>
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
                                    <p style={styles.title}> Which transactions should we scan? </p>
                                    <p>
                                        Write It Off automatically finds tax write offs among your purchase history. Please link any financial institutions you use below. 
                                    </p>


                                    <div style={styles.bankList} className="container">
                                        <div className="row align-items-middle">
                                            <div className="text-center" >
                                                {viewBanks}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row align-items-end">
                                        <div style={styles.colStyleCenter} className="col-offset-3 col-6 text-center" >
                                            <div className="container"> 
                                                <div style={styles.formStyle}>
                                                    <PlaidLink
                                                        style={styles.btnStyle}
                                                        className="btn btn-primary btn-lg"
                                                        publicKey={PLAID_PUBLIC_KEY}
                                                        product={["transactions"]}
                                                        env="development"
                                                        apiVersion={'v2'}
                                                        clientName="Spend Tracker"
                                                        onSuccess={this.handleOnSuccess}
                                                    >
                                                        Link financial institution
                                                    </PlaidLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 

            </div>
    )
    }
}


export default PlaidFace;