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
  
        this.handleOnSuccess = this.handleOnSuccess.bind(this)
    }

    handleOnSuccess(publicToken, metadata) {
        console.log(publicToken);
        this.getAccessToken(publicToken);
    }

    getAccessToken(publicToken) {
        fetch('/get_access_token', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                public_token: publicToken
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