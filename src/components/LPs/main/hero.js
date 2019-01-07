import React from "react";
import * as styles from "../../../styles";
import MediaQuery from 'react-responsive';
import PhoneInput from "../../phoneinput";


class NeverMiss extends React.Component {
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
        Amplitude.setUserProperties({'phone number': phone, 'first name': this.state.firstname});
        Amplitude.logEvent('onboarding: input name and number');
        fbq('track', 'CompleteRegistration');
    }

    render() {
        return (            
            <div style={styles.heroSection} className="col-md-6 my-auto text-left"> 
                <MediaQuery query='(max-width: 768px)'>
                    <div style={styles.heroHeader}> 
                        <p style={styles.titleMobile}> Hate tracking expenses? </p> 
                        <p style={styles.subTitleMobile}> We'll do it for you.</p>

                        <div className="col-md-auto text-center"> 
                            <div style={styles.landingPageInput}>
                                <PhoneInput />
                            </div>
                        </div>
                    </div>
                </MediaQuery>

                <MediaQuery query='(min-width: 769px)'>
                <div style={styles.heroHeaderDesktop}> 
                    <p style={styles.title}> Hate tracking expenses? </p> 
                    <p style={styles.titleMobile}> We'll do it for you.</p>

                    <div style={styles.leftPadding} className="col-md-auto text-left"> 
                        <div style={styles.landingPageInput} className="text-left">
                            <PhoneInput />
                        </div>
                    </div> 
                </div>
                </MediaQuery>

            </div>
        )
    }
}

export default NeverMiss;
