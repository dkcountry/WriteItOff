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
            email: null,
            userToken: null,
            firstname: null,
            lastname: null
        };    
        this.loginCallback = this.loginCallback.bind(this);
    }

    componentDidMount() {
        this.loginCallback({isLoggedin: false, email: "dk", userToken: 'dkdkd'})

    }

    loginCallback(loginInfo) {
        this.setState({ isLoggedin: loginInfo.isLoggedin });
        this.setState({ email: loginInfo.email });
        this.setState({ userToken: loginInfo.userToken });
        this.setState({ firstname: loginInfo.firstname });
        this.setState({ lastname: loginInfo.lastname });
    }
    

    render() {
        if (this.state.isLoggedin === false) {
            return (
                <div>
                    {/* <PlaidFace /> */}
                    {/* <LoginPage loginCallback={this.loginCallback}/> */}
                    <Switch>
                        <Route exact path='/' render={(props) => <LoginPage {...props} loginCallback={this.loginCallback}/>}/>
                        <Route exact path='/signup' render={(props) => <SignupPage {...props} loginCallback={this.loginCallback}/>}/>
                    </Switch>
                </div>
            )}
        else {
            return (
                <div>
                    <hr></hr>
                    <div> </div>Welcome, {this.state.firstname} <div/>
                    <PlaidFace />
                </div>
        )}
    }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("index"));