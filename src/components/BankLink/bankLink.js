import axios from 'axios';
import PlaidLink from 'react-plaid-link';
import React from "react";
import * as styles from "./styles";
import Amplitude from 'react-amplitude';
import KeeperNav from "./nav";

// Segment library for analytics
var Analytics = require('analytics-node');
var analytics = new Analytics('tW3P77ewudDePkXW1r8vbkleEp0ME3H5');

const PLAID_PUBLIC_KEY = "36bd55c50f7421ae5ef190a4fa03fd";
const SERVER_URL = process.env.SERVER_HOST || "https://writeitoff.herokuapp.com/"

class BankLink extends React.Component {
    constructor(props) {
        super(props);
        // Store bank info
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
        this.handlePlaidEvent = this.handlePlaidEvent.bind(this);
    }

    /**
   * @desc Send event to amplitude on Plaid Event
   * @param {*} eventName
   * @param {*} metadata
   */
    handlePlaidEvent(eventName, metadata) {
        console.log(eventName);
        console.log(metadata);
        if (metadata.request_id != null) {
            Amplitude.logEvent('bank link attempt', {'request_id': metadata.request_id});
        }
    }

    /**
   * @desc set bank info into state
   * @param {*} metadata
   */
    metadataCallback(metadata) {
        this.setState({ institutionName: metadata.institution.name });
        this.setState({ institutionId: metadata.institution.institution_id });
        this.setState({ accountId: metadata.account_id });
        this.setState({ accountType: metadata.accounts.type });
        this.setState({ accountSubType: metadata.accounts.subtype });
    }

    /**
   * @desc Retrieve array of bank accounts linked
   * @param {*} props
   */
    getBankSummary(props) {
        axios
            .post(SERVER_URL + 'get_bank_summary', {
                phone: props.phone,
                password: props.userToken
            }).then(res => {
                const accts = [];
                const data = res.data
                for (let acct in data) {
                    accts.push(data[acct]["institution_name"])
                }
                this.setState({allBanks: [...accts]})
            })
        const cleaned = ('' + props.phone).replace(/\D/g, '');
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        const phone = '1' + [match[2], match[3], match[4]].join('');
        Amplitude.init('212ed2feb2663c8004ae16498974992b', phone);
        Amplitude.setUserProperties({'phone number': props.phone, 'firstname': this.props.firstname, 'lastname': this.props.lastname});
        Amplitude.logEvent('navigation: view dashboard');
    }

    /**
   * @desc On Recieving Props
   * @param {*} nextProps
   */
    componentWillReceiveProps(nextProps) {
        this.getBankSummary(nextProps)
    }

    /**
   * @desc Handle on Plaid bank link success
   * @param {*} publicToken
   * @param {*} metadata
   */
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

    /**
   * @desc Post request to send text alert on user link
   */
    sendBankLinkText() {
        axios
            .post(SERVER_URL + 'bank-link-sms', {
                phone: this.props.phone,
                firstname: this.props.firstname,
                institutionName: this.state.institutionName
            })
    }

    /**
   * @desc get plaid access token from backend
   * @param {*} publicToken
   */
    getAccessToken(publicToken) {
        event.preventDefault();
        axios
            .post(SERVER_URL + 'get_access_token', {
                public_token: publicToken,
                phone: this.props.phone,
                institution_name: this.state.institutionName,
                institution_id: this.state.institutionId,
                account_id: this.state.accountId,
                account_type: this.state.accountType,
                account_subtype: this.state.accountSubType
            }).then(res => {
                this.getBankSummary(this.props)
            })
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
                        You're all set! Keeper will start monitoring your purchases and text you when tax write offs are recorded. Your monthly subscription starts after we've found you at least $100 in tax write offs.
                    </h6>
                </div>
            </div>
        }

        return (
            <div style={styles.outerContainer} className="container">
                <KeeperNav/>

                <div className="col-8 container" >
                    <p style={styles.sectionTitlePlaidFace}> 
                        Which accounts would you like to monitor? 
                    </p>
                    <p style={styles.plaidfaceSubtitle}>
                        Link all financial accounts used to make work-related purchases.
                    </p>
                        {/* List of bank accounts already linked */}
                        {viewBanks}
                        
                        {/* PlaidLink Component for bank links */}
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
                        
                        {/* show this once user has linked at least 1 account */}
                        {noMoreCards}
                    </div>
            </div>
        )
    }
}

export default BankLink;