import React from 'react';
import { Switch, Route } from 'react-router-dom'
import LoginPage from "./components/login";
import SignupPage from "./components/signup";


class RouteHandler extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <main >
            <Switch>
            <Route exact path='/login' render={(props) => <LoginPage {...props} isAuthed={true} />}/>
            <Route exact path='/' component={SignupPage}/>
            <Route exact path='/signup' component={SignupPage}/>
            
            </Switch>
        </main >
        )}
}

export default RouteHandler;