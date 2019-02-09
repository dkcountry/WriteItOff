import axios from 'axios';
import React from "react";
import * as styles from "../styles";
import Amplitude from 'react-amplitude';
import queryString from 'query-string';
import KeeperNav from "./partials/nav";
var Analytics = require('analytics-node');
var analytics = new Analytics('tW3P77ewudDePkXW1r8vbkleEp0ME3H5');

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        const urlValues = queryString.parse(this.props.location.search);
        this.state = {
            firstname: urlValues.fname,
            lastname: '', 
            phone: urlValues.phone,
            email: '',
            password: '',
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        Amplitude.logEvent('onboarding: set password');
    }
    
    handleChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    
    handleSubmit(event) {
        this.setState({isLoading: true});
        const cleaned = ('' + this.state.phone).replace(/\D/g, '');
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        const phone = '1' + [match[2], match[3], match[4]].join('');
        const SERVER_URL = process.env.SERVER_HOST || "https://writeitoff.herokuapp.com/"

        axios
            .post(SERVER_URL + 'signup', {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password
            }).then(res => {
                this.props.loginCallback(res.data, cb => {
                    this.props.history.push('/linked-accounts');
                  });
            }).catch(error => {
                console.log(error);
                this.setState({isLoading: 'fail'});
            }).then(() => {
                axios
                    .post(SERVER_URL + 'welcome-sms', {
                        firstname: this.state.firstname,
                        phone: this.state.phone,
                    })
            })
        
        event.preventDefault();
        Amplitude.init('212ed2feb2663c8004ae16498974992b', phone);
        Amplitude.setUserProperties({'email': this.state.email, 'lastname': this.state.lastname});
        Amplitude.logEvent('set password');

        analytics.track({
            userId: phone,
            event: 'Set password'
        });

        analytics.identify({
            userId: phone,
            traits: {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email: this.state.email,
            createdAt: new Date(),
            Stage: 'Signed up'
            }
        });
        
    }

    render() {
        let loadingView = <div></div>
        if (this.state.isLoading) {
            loadingView = <div>Loading...</div>
        }
        if (this.state.isLoading == 'fail') {
            loadingView = <div>Account already exists. Go to log in</div>
        }

        return (
        <div style={styles.outerContainer} className="container">
            <KeeperNav />
            <div style={styles.containerStyle} className="container">
                <div className="row align-items-start">
                    <div style={styles.phoneSignup} className="col-8 my-auto" >
                        <div className="container"> 
                            <div style={styles.landingPageInput}>
                                <div style={styles.phoneSignupDesc}> 
                                    <p style={styles.titleMobileLeft}> Create an account </p>
                                </div>   
                                <form style={styles.formStyle} onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label style={styles.labelStyle} htmlFor="fname"> First name: </label>
                                        <input disabled style={styles.inputStyle} onChange={this.handleChange} name="fname" id="fname" placeholder={ this.state.firstname }/>
                                    </div>
                                    <div className="form-group">
                                        <label style={styles.labelStyle} htmlFor="lastname"> Last name: </label>
                                        <input style={styles.inputStyle} onChange={this.handleChange} name="lastname" id="lastname" placeholder=""/>
                                    </div>
                                    <div className="form-group">
                                        <label style={styles.labelStyle} htmlFor="phone"> Phone number: </label>
                                        <input disabled style={styles.inputStyle} onChange={this.handleChange} name="phone" id="phone" placeholder={ this.state.phone }/>
                                    </div>
                                    <div className="form-group">
                                        <label style={styles.labelStyle} htmlFor="email"> Email: </label>
                                        <input required style={styles.inputStyle} onChange={this.handleChange} type="email" name="email" id="email" placeholder=""/>
                                    </div>
                                    <div className="form-group">
                                        <label style={styles.labelStyle} htmlFor="exampleInputPassword1"> Password: </label>
                                        <input required style={styles.inputStyle} onChange={this.handleChange} name="password" type="password" id="exampleInputPassword1" placeholder=""/>
                                    </div>
                                    <div className="col-md-auto text-center"> 
                                        {loadingView}
                                        <button style={styles.btnStyle} type="submit" className="btn btn-primary btn-lg">
                                            continue
                                        </button>
                                    </div> 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
}
export default SignupPage;