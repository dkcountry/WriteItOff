import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./components/login";
import SignupPage from "./components/signup";
import LandingPage from "./components/landingpage";
import PricingPage from "./components/pricingpage";
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import PlaidFace from "./components/plaidface";
import Footer from "./components/footer";
import * as styles from "./styles";
import Amplitude from 'react-amplitude';
import 'bootstrap/dist/css/bootstrap.css';
Amplitude.init('212ed2feb2663c8004ae16498974992b');

import PhoneSignUp from "./components/landingpage/phonesignup";
import MP4loader from "./components/landingpage/mp4loader";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
            phone: null,
            userToken: null,
            firstname: null,
            lastname: null,
        };    
        this.loginCallback = this.loginCallback.bind(this);
        this.logoutCallback = this.logoutCallback.bind(this);
    }

    loginCallback(loginInfo) {
        this.setState({ isLoggedin: loginInfo.isLoggedin });
        this.setState({ phone: loginInfo.phone });
        this.setState({ userToken: loginInfo.userToken });
        this.setState({ firstname: loginInfo.firstname });
        this.setState({ lastname: loginInfo.lastname });
        Amplitude.setUserProperties({'phone number': loginInfo.phone, 'firstname': loginInfo.firstname, 'lastname': loginInfo.lastname});
    }

    logoutCallback() {
        this.setState({isLoggedin: false});
        console.log(this.state.isLoggedin);
    }

    render() {
        if (this.state.isLoggedin === false) {
            return (
                <div>
                    <Switch>
                        <Route path='/' component={LandingPage}/>
                        <Route path='/pricing' component={PricingPage}/>
                        <Route path='/index.html' render={(props) => <SignupPage {...props} loginCallback={this.loginCallback}/>}/>
                        <Route path='/login' render={(props) => <LoginPage {...props} loginCallback={this.loginCallback}/>}/>
                    </Switch>
                    <Footer />
                </div>
            )}
        else {
            return (
                <div>
                    <PlaidFace firstname={this.state.firstname} lastname={this.state.lastname} phone={this.state.phone} userToken={this.state.userToken} logoutCallback={this.logoutCallback}/>
                    <Footer />
                </div>
        )}
    }
}

ReactDOM.hydrate(<BrowserRouter><App /></BrowserRouter>, document.getElementById("index"));
