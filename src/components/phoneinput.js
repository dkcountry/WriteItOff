import React from "react";
import * as styles from "../styles";
import MaskedInput from 'react-text-mask';
import Amplitude from 'react-amplitude';

class PhoneInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            phone: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    handleSubmit(event) {
        const cleaned = ('' + this.state.phone).replace(/\D/g, '');
	    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        const phone = '1' + [match[2], match[3], match[4]].join('');
        const promise = new Promise((resolve, reject) => {
            fetch('https://writeitoff.herokuapp.com/welcome-sms', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstname: this.state.firstname,
                phone: phone,
                })
            });
            resolve("worked!");
        })

        event.preventDefault();
        const name = this.state.firstname.split(" ")[0];
        Amplitude.init('212ed2feb2663c8004ae16498974992b', phone);
        Amplitude.setUserProperties({'phone number': phone, 'first name': this.state.firstname});
        Amplitude.logEvent('onboarding: input name and number');
        fbq('track', 'CompleteRegistration');

        // promise.then((result) => {
        //     window.location.href = "https://keepertax.typeform.com/to/tZOK37?fname=" + name + "&phone=" + phone;
        // })
    }

    render() {
        return (
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
                    <button style={styles.btnStyle} type="submit" className="btn btn-primary btn-lg">
                        get started
                    </button>
                </div> 
            </form>
        )
    }
}


export default PhoneInput;
