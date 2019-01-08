import PlaidLink from 'react-plaid-link';
import React from "react";
import { Link } from 'react-router-dom';
import * as styles from "../styles";
import Amplitude from 'react-amplitude';
import MediaQuery from 'react-responsive';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav} from 'reactstrap';


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
            allBanks: [],
            isOpen: false
        }
        this.metadataCallback = this.metadataCallback.bind(this);
        this.handleOnSuccess = this.handleOnSuccess.bind(this);
        this.getBankSummary = this.getBankSummary.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handlePlaidEvent = this.handlePlaidEvent.bind(this);
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

    handlePlaidEvent(eventName, metadata) {
        console.log(eventName);
        console.log(metadata)
        if (metadata.request_id != null) {
            Amplitude.logEvent('bank link attempt', {'request_id': metadata.request_id});
        }
    }

    metadataCallback(metadata) {
        this.setState({ institutionName: metadata.institution.name });
        this.setState({ institutionId: metadata.institution.institution_id });
        this.setState({ accountId: metadata.account_id });
        this.setState({ accountType: metadata.accounts.type });
        this.setState({ accountSubType: metadata.accounts.subtype });
    }

    getBankSummary(props) {
        const SERVER_URL = process.env.SERVER_HOST || "https://writeitoff.herokuapp.com/"
        fetch(SERVER_URL + 'get_bank_summary', {
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
        });
        const cleaned = ('' + props.phone).replace(/\D/g, '');
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        const phone = '1' + [match[2], match[3], match[4]].join('');
        Amplitude.init('212ed2feb2663c8004ae16498974992b', phone);
        Amplitude.setUserProperties({'phone number': props.phone, 'firstname': this.props.firstname, 'lastname': this.props.lastname});
        Amplitude.logEvent('navigation: view dashboard');
    }

    componentWillReceiveProps(nextProps) {
        this.getBankSummary(nextProps)
    }

    handleOnSuccess(publicToken, metadata) {
        const promise = new Promise((resolve, reject) => {
            console.log(metadata)
            this.metadataCallback(metadata);
            resolve("nice");
        });
        promise.then((result) => {
            this.getAccessToken(publicToken);
            }, (err) => {
                console.log('fail');
        });

        Amplitude.logEvent('bank account linked');        
    }

    getAccessToken(publicToken) {
        console.log(this.state.accountId);
        const SERVER_URL = process.env.SERVER_HOST || "https://writeitoff.herokuapp.com/"
        fetch(SERVER_URL + 'get_access_token', {
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
                    <Navbar color="#F7F7F7" light expand="lg">
                      <NavbarBrand style={styles.logo} href="/">
                            <img style={styles.logoIcon} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/google/146/money-with-wings_1f4b8.png"/>
                            keeper
                      </NavbarBrand>
                      <NavbarToggler onClick={this.toggle} />
                      <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <Link style={styles.navLink} to="/">
                                <p >log out</p>
                            </Link>
                        </Nav>
                      </Collapse>
                    </Navbar>
                </div>


                <div style={styles.phoneSignup} className="col-8 my-auto" >

                    <div className="container"> 

                        <div style={styles.landingPageInput}>

                            <div style={styles.phoneSignupDesc}> 
                                <p style={styles.titleMobileLeft}> 
                                <img style={styles.logoIcon} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/146/right-pointing-magnifying-glass_1f50e.png"/> 
                                &nbsp; Which purchases should we scan? 
                                </p>
                                <p style={styles.pricingText}>
                                    To find tax write offs among your purchases, we use Plaid to integrate with 1,700+ financial institutions.
                                </p>
                            </div>
        
                            <div style={styles.listContainerStyle} className="row align-items-start">
                                <div className="col-2">
                                    <img style={styles.logoIconThreeLines} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/146/lock_1f512.png"/> 
                                </div>
                                <div style={styles.iconPaddingStyle} className="col-10">
                                    <strong> Secure </strong> <br />
                                    We don't store institution login credentials in our database.
                                </div>

                                <div className="col-2">
                                    <img style={styles.logoIconThreeLines} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/146/sleuth-or-spy_1f575.png"/> 
                                </div>
                                <div style={styles.iconPaddingStyle} className="col-10">
                                    <strong> Private </strong> <br />
                                    Only our algorithm & account manager will have access to your purchase history.
                                </div>
                                <div className="col-2">
                                    <img style={styles.logoIconThreeLines} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/146/pie_1f967.png"/> 
                                </div>
                                <div style={styles.iconPaddingStyle} className="col-10">
                                    <strong> Easy </strong> <br />
                                    It's as simple as logging into your bank's website. Easy as pie!
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className="row">
                                <div className="text-center" >
                                    {viewBanks}
                                </div>
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-center">
                            <PlaidLink
                                style={styles.linkBankBtn}
                                className="btn btn-primary btn-lg"
                                publicKey={PLAID_PUBLIC_KEY}
                                product={["transactions"]}
                                env="development"
                                apiVersion={'v2'}
                                clientName="Keeper Tax"
                                onSuccess={this.handleOnSuccess}
                                onEvent = {this.handlePlaidEvent}
                            >
                            Grant read-only access
                            </PlaidLink>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}


export default PlaidFace;