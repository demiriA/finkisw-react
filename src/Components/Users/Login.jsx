import React, {Component} from "react";
import './Login.css'
import cookie from 'react-cookies'
import axios from 'axios';
import auth from '../../Auth/Auth';

class Login extends Component{

    constructor(){
        super();
        this.state = {
          error: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginTest = this.onLoginTest.bind(this);
    }

    onLoginTest(userCredentials){
      var self = this;
      axios.request({
          url:`/oauth/token?grant_type=password&username=${userCredentials.username}&password=${userCredentials.password}`,
          method: 'post',
          baseURL: "http://192.168.0.103:3001/",
          auth:{
              username: "testjwtclientid",
              password: "XY7kmzoNzl100"
          },
          data: {
              "grant_type": "client_credentials",
              "scope": "public"
          }
      })
          .then(function (response) {
              self.setState({
                error: false
              });
              auth.login(() => {
                console.log("loggedin");
                cookie.save("USER_SESSION",response.data.access_token);
                self.props.history.push("/");
              });
          })
          .catch(function(err){
            if(err.response !== undefined){
              if(err.response.status === 400){
                self.setState({
                  error: true
                })
              }
            }
            console.log(err);
          });
    }

    onSubmit(e){
        const userCredentials = {
            username: this.refs.username.value,
            password: this.refs.password.value
        };
        this.onLoginTest(userCredentials);
        e.preventDefault()
    }

    render() {
      return (
            <div className="container-fluid bg-custom">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="login-container">
                            <div className="login-header"/>
                            <div className="row p-4">
                                <div className="col-md-4 login-logo"/>
                                <div className="form-group col-md-8 m-auto text-right">
                                    <h3>Central Authenticate Service (CAS)</h3>
                                    <form onSubmit={this.onSubmit}>
                                        <input type="text" name="username" ref="username" placeholder="Username" className="form-control mb-2" />
                                        <input type="password" name="password" ref="password" placeholder="Password" className="form-control mb-2" />
                                        {
                                          this.state.error ? (<div className="alert alert-danger" >Bad Credentials!</div>) : ""
                                        }
                                        <input type="reset" value="Clear" className="btn btn-outline-secondary mb-2 mr-2"/>
                                        <input type="submit" value="Login" className="btn btn-secondary mb-2"/>
                                    </form>
                                </div>
                            </div>
                            <div className="login-texts">
                                <p>For security reasons, please Log Out and Exit your web browser when you are done accessing services that require authentication!</p>
                                <p>For password reset, login problem or technical assistance, visit Services for Students of the FCSE.</p>
                                <p>The Central Authentication Servis enables login to multiple web sites with a single input of your FCSE username and password.
                                    After your credentials are checked succesfully, you are given a ticket to use for login to all web sites that CAS. Pay attention:
                                    the login ticked is held within your browsers temporary memory until you close all browser windows (or deliberately delete browsers privacy settings and session).</p>
                                <p><b>NOTE: THIS IS A PROJECT MADE BY GROUP OF STUDENTS FOR THE SUBJECT ELECTRONIC AND MOBILE COMMERCE (Електронска и мобилна трговија), BASED ON THE FINKI SYSTEMS TEMPLATE, WE CREATED SIMILAR DESIGN.
                                </b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
export default Login;
