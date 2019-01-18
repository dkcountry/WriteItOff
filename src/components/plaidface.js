import PlaidLink from 'react-plaid-link';
import React from "react";
import { Link } from 'react-router-dom';
import * as styles from "../styles";
import Amplitude from 'react-amplitude';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink} from 'reactstrap';
var Analytics = require('analytics-node');
var analytics = new Analytics('tW3P77ewudDePkXW1r8vbkleEp0ME3H5');


const PLAID_PUBLIC_KEY = "36bd55c50f7421ae5ef190a4fa03fd";
const SERVER_URL = process.env.SERVER_HOST || "https://writeitoff.herokuapp.com/"

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
        console.log(metadata);
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
            this.sendBankLinkText()
            }, (err) => {
                console.log('fail');
        });
        Amplitude.logEvent('bank account linked');  
        analytics.identify({
          userId: this.props.phone,
          traits: {
            Stage: 'Bank Linked',
            email: this.props.email
          }
        });
    }

    sendBankLinkText() {
        fetch(SERVER_URL + 'bank-link-sms', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                phone: this.props.phone,
                firstname: this.props.firstname,
                institutionName: this.state.institutionName,
            })
        })
    }

    getAccessToken(publicToken) {
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
                <div  key={bank} style={styles.bankCard} className="card text-left">
                    <div className="card-body">
                        <h5 className="card-title">
                            {this.state.allBanks[bank]} 
                            <span style={styles.bankLinked}> - Linked</span>
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            Purchases made with this account's credit and debit cards will be monitored for write offs
                        </h6>
                    </div>
                </div>
            )
        }
        let buttonTitle = "Link an account"
        let noMoreCards = <div style={{"paddingBottom": "450px"}}></div>
        if (viewBanks.length != 0) {
            buttonTitle = "Link another account"
            noMoreCards = 
            <div className="d-flex justify-content-center container text-left" style={styles.bankCard}>
                <div className="card-body" style={{"paddingBottom": "200px"}}>
                    <h5 style={styles.sectionTitleNoMoreAccounts}>
                        No other accounts you'd like to monitor?
                    </h5>
                    <h6 style={styles.noMoreSubtitle}>
                        You're all set! Keeper will start reviewing your purchases and text you when tax write offs are recorded.
                    </h6>
                </div>
            </div>
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
                            <NavLink style={styles.navLink} href="https://blog.keepertax.com">
                                <p >blog</p> 
                            </NavLink>
                            <NavLink style={styles.navLink} href="https://keepertax.com">
                                <p >log out</p>
                            </NavLink>
                        </Nav>
                      </Collapse>
                    </Navbar>
                </div>

                <div className="col-8 container" >
                    <p style={styles.sectionTitlePlaidFace}> 
                        Which accounts would you like to monitor? 
                    </p>
                    <p style={styles.plaidfaceSubtitle}>
                        Link all financial accounts used to make work-related purchases.
                    </p>

                        {viewBanks}
                        
                        <div className="d-flex">
                            <PlaidLink
                                style={styles.btnStyleBankLink}
                                className="btn btn-primary btn-lg"
                                publicKey={PLAID_PUBLIC_KEY}
                                product={["transactions"]}
                                env="production"
                                apiVersion={'v2'}
                                clientName="Keeper Tax"
                                onSuccess={this.handleOnSuccess}
                                onEvent = {this.handlePlaidEvent}
                            >
                            ➕ {buttonTitle}
                            </PlaidLink>
                        </div>
                        
                        {noMoreCards}
                    </div>
            </div>
        )
    }
}

export default PlaidFace;