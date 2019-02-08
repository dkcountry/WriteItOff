import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./components/login";
import SignupPage from "./components/signup";
import MainLP from "./components/LPs/main/landingpage";
import RealestateLP from "./components/LPs/real-estate/landingpage";
import TyroneLP from "./components/LPs/tyrone/landingpage";
import ScooterMapLP from "./components/LPs/scooter-map-promo/landingpage";
import YCpromoLP from "./components/LPs/ycpromo/landingpage";
import TyronePricing from "./components/LPs/tyrone/tyronepricing";
import BetalistLP from "./components/LPs/betalist/landingpage";
import PricingPage from "./components/pricingpage";
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import BankLink from "./components/BankLink/bankLink";
import Footer from "./components/partials/footer";
import TermsPage from "./components/terms";
import Amplitude from 'react-amplitude';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from './components/Dashboard/dashboard';


class App extends React.Component {
    constructor(props) {
        super(props);
        // Store user info
        this.state = {
            isLoggedin: false,
            phone: null,
            email: null,
            userToken: null,
            firstname: null,
            lastname: null,
        };    
        this.loginCallback = this.loginCallback.bind(this);
        this.logoutCallback = this.logoutCallback.bind(this);
    }

    /**
   * @desc Pass LoginInfo into state
   * @param {*} loginInfo
   */
    loginCallback(loginInfo) {
        this.setState({ isLoggedin: loginInfo.isLoggedin });
        this.setState({ phone: loginInfo.phone });
        this.setState({ userToken: loginInfo.userToken });
        this.setState({ firstname: loginInfo.firstname });
        this.setState({ lastname: loginInfo.lastname });
        this.setState({ email: loginInfo.email });

        Amplitude.setUserProperties({
            'phone number': loginInfo.phone,
            firstname: loginInfo.firstname,
            lastname: loginInfo.lastname,
            email: loginInfo.email
        });
    }

    /**
   * @desc Logout - set isLoggedin to false
   */
    logoutCallback() {
        this.setState({isLoggedin: false});
    }

    render() {
        if (this.state.isLoggedin === false) {
          return (
            <div>
              <Switch>
                <Route exact path='/' component={MainLP} />
                <Route exact path='/betalist' component={BetalistLP} />
                <Route exact path='/real-estate-agent' component={RealestateLP} />
                <Route exact path='/se-tax-guy' component={TyroneLP} />
                <Route exact path='/scooter-map-promo' component={ScooterMapLP} />
                <Route exact path='/se-tax-guy/pricing' component={TyronePricing} />
                <Route exact path='/yc-promo' component={YCpromoLP} />
                <Route exact path='/pricing' component={PricingPage} />
                <Route exact path='/terms' component={TermsPage} />
                <Route exact path='/signup' render={props => <SignupPage {...props} loginCallback={this.loginCallback} />} />
                <Route exact path='/index.html' render={props => <SignupPage {...props} loginCallback={this.loginCallback} />} />
                <Route exact path='/login' render={props => <LoginPage {...props} loginCallback={this.loginCallback} />} />
                <Route path='/dashboard' component={Dashboard} />
              </Switch>
              <Footer />
            </div>
          );
        } else {
          return (
            <div>
              {/* <BankLink
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                phone={this.state.phone}
                email={this.state.email}
                userToken={this.state.userToken}
                logoutCallback={this.logoutCallback}
              /> */}

            <Dashboard
                isLoggedin={this.state.isLoggedin}
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                phone={this.state.phone}
                email={this.state.email}
                userToken={this.state.userToken}
                logoutCallback={this.logoutCallback}
            />
              <Footer />
            </div>
          );
        }
    }
}

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('index')
);


