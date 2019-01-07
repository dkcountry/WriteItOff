import React from "react";
import { Link } from 'react-router-dom';
import * as styles from "../styles";
import Amplitude from 'react-amplitude';
import MaskedInput from 'react-text-mask';
import KeeperNav from "./nav";


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '', 
            password: '',
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        Amplitude.logEvent('navigation: login page');
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    
    handleSubmit(event) {
        this.setState({isLoading: true});
        const SERVER_URL = process.env.SERVER_HOST || "https://writeitoff.herokuapp.com/"
        console.log(SERVER_URL)

        const cleaned = ('' + this.state.phone).replace(/\D/g, '');
	    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        const phone = '1' + [match[2], match[3], match[4]].join('');
        
        fetch(SERVER_URL + 'signin', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                phone: phone,
                password: this.state.password
              })
        }).then(results => {
            if (!results.ok) {
                this.setState({isLoading: 'fail'});
                throw Error(results.statusText);
            }
            return results.json();
        }).then(data => {
            this.props.loginCallback(data)
        });
        event.preventDefault();
        Amplitude.init('212ed2feb2663c8004ae16498974992b', phone);
        Amplitude.logEvent('log in');        
    }

    render() {
        let loadingView = <div></div>
        if (this.state.isLoading) {
            loadingView = <div>Loading...</div>
        }
        if (this.state.isLoading == 'fail') {
            loadingView = <div>Phone Number / Password Invalid</div>
        }

        return (
        <div style={styles.outerContainer} className="container">
             <KeeperNav />

            <div style={styles.containerStyle} className="container">
                <div className="row align-items-start">
                    <div style={styles.actionCard} className="col-6 my-auto" >
                        <div className="container"> 

                            <div>
                                <p style={styles.title}> Welcome back!</p>
                            </div>

                            <div style={styles.landingPageInput}>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <MaskedInput 
                                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        style={styles.inputStyle} onChange={this.handleChange} name="phone" type="tel" required id="exampleInputPhone1" placeholder="phone number"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input style={styles.inputStyle} onChange={this.handleChange} name="password" type="password" id="exampleInputPassword1" placeholder="password"/>
                                    </div>
                                    <div className="col-md-auto text-center"> 
                                        {loadingView}
                                        <button style={styles.btnStyle} type="submit" className="btn btn-primary btn-lg">
                                            log in
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


export default LoginPage;