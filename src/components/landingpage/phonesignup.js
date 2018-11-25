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
            isLoading: false
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
        Amplitude.init('212ed2feb2663c8004ae16498974992b', this.state.phone);
        Amplitude.logEvent('onboarding: input name and number');
    }

    render() {
        let loadingView = <div></div>
        if (this.state.isLoading) {
            loadingView = <div>We just sent you a text message!</div>
        }

        return (
            <div style={styles.wideActionCard} className="col-12 my-auto text-center"> 
                <div className="col-lg-6 my-auto container text-center">
                <div> 
                    <p style={styles.title}> Never miss a {"\n"} tax write off</p>
                </div>

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
                            <button style={styles.btnStyle} type="submit" className="btn btn-primary btn-lg">
                                try it out
                            </button>
                        </div> 
                    </form>
                </div>
                </div>
            </div>
        )
    }
}


export default PhoneSignUp;
