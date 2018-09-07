import React from "react";
import { Link } from 'react-router-dom';


const style = {
    "margin": "auto",
    "fontSize": "40px",
    "fontWeight": "bold"
}

const navStyle = {
    "height": "50px",
}

const formStyle = {
    "paddingTop": "50px",
    "fontWeight": "bold"
}

const btnStyle = {
    "display":"inline-block",
    "marginTop": "25px",
    "fontWeight": "bold",
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
            <nav style={navStyle} className="navbar justify-content-between">
                <a className="navbar-brand"></a>
                <Link to="/">
                    <p className="text-secondary">sign up</p>
                </Link>
            </nav>

            <div className="container">
                
                <div className="row align-items-start">
                    <div className="col">
                    </div>
                    <div className="col-6 text-center" >
                        <div className="container"> 
                            <p style={style} className="bold text-center">login </p>
                        </div>
                    </div>
                    <div className="col">
                    </div>
                </div>

                 <div className="row align-items-end">
                    <div className="col">
                    </div>
                    <div className="col-6" >
                        <form style={formStyle} onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputPhone1">Phone number</label>
                                <input onChange={this.handleChange} name="phone" className="form-control" id="exampleInputPhone1" aria-describedby="emailHelp" placeholder="(123) 456 7890"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input onChange={this.handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="password"/>
                            </div>
                            <div className="col-md-auto text-center"> 
                                <button style={btnStyle} type="submit" className="btn btn-primary btn-lg">Log in</button>
                            </div> 
                        </form>
                    </div>
                    <div className="col">
                    </div>
                </div>  
            </div>                 

        </div>
    )}
}


export default LoginPage;