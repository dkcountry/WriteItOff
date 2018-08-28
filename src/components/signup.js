import React from "react";


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

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '', 
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
        console.log(this.state)
        fetch('/signup', {
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
                <p  style={style} className="navbar-brand">Sign Up</p>
                </div>
            </nav>
            
            <form style={formStyle} onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputFirstName">First Name</label>
                    <input onChange={this.handleChange} name="firstname" type="text" className="form-control" id="exampleInputFirstName" placeholder="Enter first name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputLastName">Last Name</label>
                    <input onChange={this.handleChange} name="lastname" type="text" className="form-control" id="exampleInputLastName" placeholder="Enter last name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPhone">Phone Number</label>
                    <input onChange={this.handleChange} name="phone" type="text" className="form-control" id="exampleInputPhone" placeholder="Enter Phone #"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={this.handleChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={this.handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button style={btnStyle} type="submit" className="btn btn-primary">Submit</button> 
            </form>
        </div>
    )}
}


export default SignupPage;