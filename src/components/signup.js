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
            lastname: '', 
            phone: '',
            password: '',
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        Amplitude.logEvent('navigation: signup page');
    }
    
    handleChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    
    handleSubmit(event) {
        this.setState({isLoading: true});
        fetch('https://writeitoff.herokuapp.com/signup', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password
              })
        }).then(results => {
            return results.json();
        }).then(data => {
            this.props.loginCallback(data)
        });
        event.preventDefault();
        Amplitude.init('212ed2feb2663c8004ae16498974992b', this.state.phone);
        Amplitude.logEvent('sign up');
    }

    render() {
        let loadingView = <div></div>
        if (this.state.isLoading) {
            loadingView = <div>Loading...</div>
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
                    <div style={styles.colStyleCenter} className="col-6" >
                        <div className="container text-center"> 
                            <p style={styles.title} className="bold text-center">Pssst! You're invited. </p>
                            <div className="row justify-content-sm-center">
                                <div className="text-justify">
                                    Welcome to the private beta for Write It Off. Our site might not be pretty yet, but who cares when we’re saving you a heck of a lot on taxes — for free!
                                </div>
                            </div>
                        </div>

                        <form style={styles.formStyle} onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputFirstName">First name</label>
                                <input onChange={this.handleChange} name="firstname" type="text" className="form-control" id="exampleInputFirstName" placeholder="Warren"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputLastName">Last name</label>
                                <input onChange={this.handleChange} name="lastname" type="text" className="form-control" id="exampleInputLastName" placeholder="Buffet"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPhone">Phone number</label>
                                <input onChange={this.handleChange} name="phone" type="text" className="form-control" id="exampleInputPhone" placeholder="(123) 456 7890"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input onChange={this.handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="At least 6 characters"/>
                            </div>
                            <div className="col-md-auto text-center"> 
                                {loadingView}
                                <button style={styles.btnStyle} type="submit" className="btn btn-primary btn-lg">
                                    Goodbye, tax stress
                                </button>
                            </div> 
                        </form>
                    </div>
                    <div style={styles.imagePadding} className="text-center">
                        <WIOImage />
                    </div>
                </div>
               
            </div>
        </div>
    )}
}


export default SignupPage;
