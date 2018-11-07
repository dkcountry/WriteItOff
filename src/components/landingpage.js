import React from "react";
import { Link } from "react-router-dom";
import * as styles from "../styles";
import Amplitude from 'react-amplitude';
import WIOImage from "./wioImage";

class SignupPage extends React.Component {
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
        fetch('http://penguin.linux.test:5000/sms', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstname: this.state.firstname,
                phone: this.state.phone,
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
        <div>
            <nav style={styles.navStyle} className="navbar justify-content-between">
                <a className="navbar-brand"></a>
                <Link to="/index.html">
                    <p className="text-secondary">log in</p>
                </Link>
            </nav>

       

            <div style={styles.containerStyle} className="container">
                
                <div className="row align-items-start">
                    <div style={styles.imagePadding} className="text-center">
                        <WIOImage />
                    </div>
                    <div style={styles.colStyleCenter} className="col-6 my-auto" >
                        <div className="container text-center"> 
                            <p style={styles.title} className="bold text-center">Say hello to your new personal bookkeeper </p>
                        </div>

                        <form style={styles.formStyle} onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputFirstName">First name</label>
                                <input onChange={this.handleChange} name="firstname" type="text" required className="form-control" id="exampleInputFirstName" placeholder="Warren"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPhone">Phone number</label>
                                <input onChange={this.handleChange} name="phone" type="text" required className="form-control" id="exampleInputPhone" placeholder="(123) 456 7890"/>
                            </div>
                            <div className="col-md-auto text-center"> 
                                {loadingView}
                                <button style={styles.btnStyle} type="submit" className="btn btn-primary btn-lg">
                                    Hello!
                                </button>
                            </div> 
                        </form>
                    </div>
                </div>
               
            </div>
        </div>
    )}
}


export default SignupPage;
