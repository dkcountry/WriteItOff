import React from "react";
import { Link } from "react-router-dom";
import * as styles from "../styles";

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '', 
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
    }

    render() {
        return (
        <div>
            <nav style={styles.navStyle} className="navbar justify-content-between">
                <a className="navbar-brand"></a>
                <Link to="/login">
                    <p className="text-secondary">log in</p>
                </Link>
            </nav>

            <div style={styles.containerStyle} className="container">
                
                <div className="row align-items-start">
                    <div style={styles.colStyle} className="col-6 text-center" >
                        <div className="container"> 
                            <p style={styles.title} className="bold text-center">Pssst! You're invited. </p>
                            <div className="row justify-content-sm-center">
                                <div className="text-justify">
                                    Welcome to the private beta for Write It Off. Our site might not be pretty yet, but who cares when we’re saving you a heck of a lot on taxes — for free!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row align-items-end">
                    <div style={styles.colStyle} className="col-6" >
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
                                <button style={styles.btnStyle} type="submit" className="btn btn-primary btn-lg">
                                    Goodbye, tax stress
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