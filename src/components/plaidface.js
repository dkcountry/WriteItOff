import plaid from 'plaid';
import PlaidLink from 'react-plaid-link';
import React from "react";
import { Link } from 'react-router-dom';
import * as styles from "../styles";


const PLAID_PUBLIC_KEY = "36bd55c50f7421ae5ef190a4fa03fd";


const formStyle = {
    "paddingLeft": "37%",
    "paddingRight": "37%",
    "paddingTop": "50px"
}

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
            console.log(data)
        })
    }

    componentWillReceiveProps(nextProps) {
        this.getBankSummary(nextProps)
    }

    handleOnSuccess(publicToken, metadata) {
        console.log(publicToken);
        this.metadataCallback(metadata);
        this.getAccessToken(publicToken);
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
            console.log(data)
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
            <div>
                <nav style={styles.navStyle} className="navbar justify-content-between">
                    <a className="navbar-brand"></a>
                    <Link to="/login">
                        <p className="text-secondary">log out</p>
                    </Link>
                </nav>

                <div style={styles.containerStyle} className="container">

                    <div className="row align-items-start">
                        <div style={styles.colStyle} className="col-6 text-center" >
                            <div className="container"> 
                                <p style={styles.title} className="bold text-center">Which transactions should we scan? </p>
                                <div className="row justify-content-sm-center">
                                    <div className="text-justify">
                                        Write It Off automatically finds tax write offs among your purchase history. Please link any financial institutions you use below. 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.bankList} className="container">
                        <div className="row align-items-middle">
                            <div style={styles.colStyle} className="col-6 text-center" >
                                {viewBanks}
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-end">
                        <div style={styles.colStyle} className="col-6 text-center" >
                            <div className="container"> 
                                <div style={styles.formStyle}>
                                    <PlaidLink
                                        style={styles.btnStyle}
                                        className="btn btn-primary btn-lg"
                                        publicKey={PLAID_PUBLIC_KEY}
                                        product={["auth", "transactions"]}
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
    )
    }
}


export default PlaidFace;