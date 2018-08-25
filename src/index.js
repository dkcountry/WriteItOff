import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./components/login"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
            email: null,
            userToken: null,
            firstname: null,
            lastname: null
        };    
        this.loginCallback = this.loginCallback.bind(this);
    }

    componentDidMount() {
        this.loginCallback({isLoggedin: false, email: "dk", userToken: 'dkdkd'})

    }

    loginCallback(loginInfo) {
        this.setState({ isLoggedin: loginInfo.isLoggedin });
        this.setState({ email: loginInfo.email });
        this.setState({ userToken: loginInfo.userToken });
        this.setState({ firstname: loginInfo.firstname });
        this.setState({ lastname: loginInfo.lastname });
    }

    render() {
        if (this.state.isLoggedin === false) {
            return (
                <div>
                    <LoginPage loginCallback={this.loginCallback}/>
                </div>
            )}
        else {
            return (
                <div>
                    <hr></hr>
                    Welcome, {this.state.firstname}
                </div>
        )}
    }
}

ReactDOM.render(<App />, document.getElementById("index"));