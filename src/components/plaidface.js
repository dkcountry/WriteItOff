import plaid from 'plaid';
import PlaidLink from 'react-plaid-link';
import React from "react";


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
            accountSubType: null
        }

        this.metadataCallback = this.metadataCallback.bind(this);
        this.handleOnSuccess = this.handleOnSuccess.bind(this)
    }

    metadataCallback(metadata) {
        this.setState({ institutionName: metadata.institution.name });
        this.setState({ institutionId: metadata.institution.institution_id });
        this.setState({ accountId: metadata.accounts.id });
        this.setState({ accountType: metadata.accounts.type });
        this.setState({ accountSubType: metadata.accounts.subtype });
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
            this.props.plaidCallback(data)
        });
        event.preventDefault();
    }

    render() {
        return (
            <div style={formStyle}>
                <PlaidLink
                    publicKey={PLAID_PUBLIC_KEY}
                    product={["auth", "transactions"]}
                    env="sandbox"
                    apiVersion={'v2'}
                    clientName="Spend Tracker"
                    onSuccess={this.handleOnSuccess}
                >
                        Open Link and connect your bank!
                </PlaidLink>
            </div>
    )
    }
}


export default PlaidFace;