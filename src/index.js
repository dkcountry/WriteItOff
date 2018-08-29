import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./components/login"
import SignupPage from "./components/signup"
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom'
import PlaidFace from "./components/plaidface"


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
            phone: null,
            userToken: null,
            firstname: null,
            lastname: null,
            accessTokens: [],
            items: [],
        };    
        this.loginCallback = this.loginCallback.bind(this);
        this.plaidCallback = this.plaidCallback.bind(this);
    }

    componentDidMount() {
        this.loginCallback({isLoggedin: false, phone: "dk", userToken: 'dkdkd'})

    }

    loginCallback(loginInfo) {
        this.setState({ isLoggedin: loginInfo.isLoggedin });
        this.setState({ phone: loginInfo.phone });
        this.setState({ userToken: loginInfo.userToken });
        this.setState({ firstname: loginInfo.firstname });
        this.setState({ lastname: loginInfo.lastname });
    }

    plaidCallback(plaidInfo) {
        this.setState({ accessTokens: [...this.state.accessTokens, plaidInfo.accessToken] })
        this.setState({ items: [...this.state.items, plaidInfo.itemId] })
    }

    render() {
        const viewItems = [];
        for (let item in this.state.items) {
            viewItems.push(
                <div  key={item} className="col-sm-12">
                    {this.state.items[item]}
                </div>
            )
        }
        const viewTokens = [];
        for (let item in this.state.accessTokens) {
            viewTokens.push(
                <div  key={item} className="col-sm-12">
                    {this.state.accessTokens[item]}
                </div>
            )
        }


        if (this.state.isLoggedin === false) {
            return (
                <div>
                    <Switch>
                        <Route exact path='/' render={(props) => <SignupPage {...props} loginCallback={this.loginCallback}/>}/>
                        <Route exact path='/login' render={(props) => <LoginPage {...props} loginCallback={this.loginCallback}/>}/>
                    </Switch>
                </div>
            )}
        else {
            return (
                <div>
                    <hr></hr>
                    <div> </div>Welcome, {this.state.firstname} <div/>
                    <div>{viewItems}</div>
                    <div>{viewTokens}</div>

                    <PlaidFace plaidCallback={this.plaidCallback} phone={this.state.phone}/>
                </div>
        )}
    }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("index"));