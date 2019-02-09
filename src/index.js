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
    loginCallback(loginInfo, callback) {
        const { isLoggedIn, firstname, lastname, email, phone, userToken } = loginInfo;
        Amplitude.setUserProperties({
          'phone number': loginInfo.phone,
          firstname: loginInfo.firstname,
          lastname: loginInfo.lastname,
          email: loginInfo.email
        });
        const stateObj = {
          isLoggedin: isLoggedIn,
          firstname,
          lastname,
          email,
          phone,
          userToken
        };
        this.setState(stateObj, () => {
          callback(1);
        });
      }
    

    /**
   * @desc Logout - set isLoggedin to false
   */
    logoutCallback() {
        this.setState({isLoggedin: false});
    }

    render() {
        const { isLoggedin } = this.state;
        const DashboardPage = props => {
            return (
              <Dashboard
                {...props}
                isLoggedin={isLoggedin}
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                phone={this.state.phone}
                email={this.state.email}
                userToken={this.state.userToken}
                logoutCallback={this.logoutCallback}
              />
            );
        };
        const BankLinkPage = props => {
            return (
              <BankLink
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                phone={this.state.phone}
                email={this.state.email}
                userToken={this.state.userToken}
                logoutCallback={this.logoutCallback}
                {...props}
              />
            );
          };

          return (
            <div>
              <Switch>
                <Route exact path='/' component={MainLP} />
                <Route path='/betalist' component={BetalistLP} />
                <Route path='/real-estate-agent' component={RealestateLP} />
                <Route path='/se-tax-guy' component={TyroneLP} />
                <Route path='/scooter-map-promo' component={ScooterMapLP} />
                <Route path='/se-tax-guy/pricing' component={TyronePricing} />
                <Route path='/yc-promo' component={YCpromoLP} />
                <Route path='/pricing' component={PricingPage} />
                <Route path='/terms' component={TermsPage} />
                <Route path='/signup' render={props => <SignupPage {...props} loginCallback={this.loginCallback} />} />
                <Route path='/index.html' render={props => <SignupPage {...props} loginCallback={this.loginCallback} />} />
                <Route path='/login' render={props => <LoginPage {...props} loginCallback={this.loginCallback} />} />
                <Route 
                    path='/dashboard'
                    render={props => (isLoggedin === true) ? (<DashboardPage />) : (<Redirect to="/" />)}
                />
                <Route
                    path='/linked-accounts'
                    render={props => (isLoggedin === true) ? (<BankLinkPage/>) : (<Redirect to="/" />)}
                />
              </Switch>
              <Footer />
            </div>
          );
        }
      }
      
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('index'));
