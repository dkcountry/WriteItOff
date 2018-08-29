import React from "react";
import { Link } from 'react-router-dom'


const style = {
    "margin": "auto",
    "fontSize": "40px"
}

const navStyle = {
    "height": "200px"
}

const formStyle = {
    "paddingLeft": "37%",
    "paddingRight": "37%",
    "paddingTop": "50px"
}

const btnStyle = {
    "backgroundColor": "#445c82"
}

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
            console.log(data)
            this.props.loginCallback(data)
        });
        event.preventDefault();
    }

    render() {
        return (
        <div>
            <nav style={navStyle} className="navbar navbar-dark bg-dark">
                <div className="container">
                <p  style={style} className="navbar-brand">Write It Off</p>
                </div>
            </nav>

            <form style={formStyle} onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputPhone1">Login</label>
                    <input onChange={this.handleChange} name="phone" className="form-control" id="exampleInputPhone1" aria-describedby="emailHelp" placeholder="Enter phone #"/>
                    {/* <small id="phoneHelp" className="form-text text-muted">We'll never share your phone with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={this.handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button style={btnStyle} type="submit" className="btn btn-primary">Submit</button> 

                <span style={{"paddingLeft": "10px"}}>
                <Link to="/signup">
                <button style={btnStyle} className="btn btn-primary">
                    <div >
                        Sign Up! 
                    </div>
                </button>
                </Link>
                </span>
            </form>

        </div>
    )}
}


export default LoginPage;