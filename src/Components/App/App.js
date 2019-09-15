import React, {Component} from 'react';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import Login from "../Users/Login";
import ProtectedRoutes from "../ProtectedRoutes";
import auth from '../../Auth/Auth';

import {createHashHistory } from 'history';
export const history = createHashHistory();

class App extends Component{

    componentDidMount(){
      if(!auth.isAuthenticated()){
        this.props.history.push("/login");
      }
    }

    render() {
            return (
                <BrowserRouter>
                  <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route path="/" component={ProtectedRoutes} />
                  </Switch>
                </BrowserRouter>
            )
    }
}

export default withRouter(App);
