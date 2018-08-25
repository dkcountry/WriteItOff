import plaid from 'plaid';
import PlaidLink from 'react-plaid-link';
import React from "react";


const PLAID_CLIENT_ID = "5b6cf13a82440e00123aa8ae";
const PLAID_SECRET = "e1bb4fd2ba0f28bd3ffadde0804978";
const PLAID_PUBLIC_KEY = "36bd55c50f7421ae5ef190a4fa03fd";
const PLAID_ENV = "sandbox";


const formStyle = {
    "paddingLeft": "37%",
    "paddingRight": "37%",
    "paddingTop": "50px"
}

class PlaidFace extends React.Component {
    constructor(props) {
      super(props);
  
    //   this.state = {
    //     items: getItems(),
    //     balance: 0,
    //     loading: false,
    //     error: null,
    //   };
  
    // this.client = new plaid.Client(
    //     PLAID_CLIENT_ID,
    //     PLAID_SECRET,
    //     PLAID_PUBLIC_KEY,
    //     plaid.environments.sandbox
    //   );
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
                    onSuccess={() => (console.log('success'))}
                >
                        Open Link and connect your bank!
                </PlaidLink>
            </div>
    )
    }
}


export default PlaidFace;