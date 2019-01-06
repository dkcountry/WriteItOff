import React from "react";
import * as styles from "../styles";
import MaskedInput from 'react-text-mask';
import Amplitude from 'react-amplitude';

class PhoneSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            phone: '',
            isLoading: false,
            btnDisabled: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        var path_array = window.location.pathname.split("/");
        Amplitude.logEvent('navigation: landing page', {'url': path_array[path_array.length-1]});
    }
    
    handleChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    handleSubmit(event) {
        this.setState({btnDisabled: true});
        this.setState({isLoading: true});
        const cleaned = ('' + this.state.phone).replace(/\D/g, '');
	    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        const phone = '1' + [match[2], match[3], match[4]].join('');
        const SERVER_URL = process.env.SERVER_HOST

        fetch(SERVER_URL + 'welcome-sms', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstname: this.state.firstname,
                phone: phone,
              })
        }).then(results => {
            return results.json();
        }).then(data => {
            this.props.loginCallback(data)
        });
        event.preventDefault();
        Amplitude.init('212ed2feb2663c8004ae16498974992b', phone);
        Amplitude.setUserProperties({'phone number': phone, 'first name': this.state.firstname});
        Amplitude.logEvent('onboarding: input name and number');
    }

    render() {
        let loadingView = <div></div>
        if (this.state.isLoading) {
            loadingView = <div>You're on the list!</div>
        }

        return (
            <div id="signup" style={styles.phoneSignup} className="col-12 my-auto text-center"> 
                <div className="row">
                    <div style={styles.phoneSignupDesc} className="col-8 text-center"> 
                        <p style={styles.titleMobileOffset}>Sign up, see it for yourself </p>
                    </div>
                </div>
                <div className="row">
                    <div style={styles.phoneSignupAction} className="col-8 my-auto text-center">

                        <div style={styles.landingPageInput}>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input style={styles.inputStyle} onChange={this.handleChange} name="firstname" type="text" required id="exampleInputFirstName" placeholder="first name"/>
                                </div>
                                <div className="form-group">
                                    <MaskedInput 
                                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        style={styles.inputStyle} onChange={this.handleChange} name="phone" type="tel" required id="exampleInputPhone" placeholder="phone number"
                                    />
                                </div>
                                <div className="col-md-auto text-center"> 
                                    {loadingView}
                                    <button disabled={this.state.btnDisabled} style={styles.btnStyle} type="submit" className="btn btn-primary btn-lg">
                                        request access
                                    </button>
                                </div> 
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default PhoneSignUp;
