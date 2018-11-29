import React from "react";
import * as styles from "../../styles";
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
        Amplitude.logEvent('navigation: landing page');
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
        fetch('https://writeitoff.herokuapp.com/welcome-sms', {
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
        Amplitude.logEvent('onboarding: input name and number');
    }

    render() {
        let loadingView = <div></div>
        if (this.state.isLoading) {
            loadingView = <div>We just sent you a text message!</div>
        }

        return (
            <div id="signup" style={styles.phoneSignup} className="col-12 my-auto text-center"> 
                <div className="row">
                    <div className="col-12"> 
                        <p style={styles.signupTitle}> Never miss a write off.</p>
                        <p style={styles.signupSubTitle}> 1 month free trial | $9.99/month after</p>
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
                                        try keeper
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
