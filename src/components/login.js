import React from "react";
import { Link } from 'react-router-dom';
import * as styles from "../styles";
import Amplitude from 'react-amplitude';

Amplitude.logEvent('navigation: login page');

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '', 
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    
    handleSubmit(event) {
        fetch('https://writeitoff.herokuapp.com/signin', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
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
        Amplitude.logEvent('log in');        
    }

    render() {
        return (
        <div>
            <nav style={styles.navStyle} className="navbar justify-content-between">
                <a className="navbar-brand"></a>
                <Link to="/">
                    <p className="text-secondary">sign up</p>
                </Link>
            </nav>

            <div style={styles.containerStyle} className="container">
                
                <div className="row align-items-start">
                    <div style={styles.colStyle} className="col-6 text-center" >
                        <div className="container"> 
                            <p style={styles.title} className="bold text-center">login </p>
                        </div>
                    </div>
                </div>

                 <div className="row align-items-end">
                    <div style={styles.colStyle} className="col-6" >
                        <form style={styles.formStyle} onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputPhone1">Phone number</label>
                                <input onChange={this.handleChange} name="phone" className="form-control" id="exampleInputPhone1" aria-describedby="emailHelp" placeholder="(123) 456 7890"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input onChange={this.handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="password"/>
                            </div>
                            <div className="col-md-auto text-center"> 
                                <button style={styles.btnStyle} type="submit" className="btn btn-primary btn-lg">Log in</button>
                            </div> 
                        </form>
                    </div>
                </div>  
            </div>                 

        </div>
    )}
}


export default LoginPage;