import React, {Component} from "react";
import axios from 'axios';
import cookie from 'react-cookies';
import language from "../../Resources/lang";
import config from '../../Resources/Config';


class UserSettingsForm extends Component{

    constructor(){
        super();
        this.state = {
            id:'',
            name:'',
            surname:'',
            role:'',
            username:'',
            email: '',
            password: '',
            newpassword: '',
            alertSuccess: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }

    getUser(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/current?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response =>{
                this.setState({
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email,
                    name: response.data.firstName,
                    surname: response.data.lastName,
                    role: response.data.roles
                });
            })
            .catch(err => console.log(err));
    }


    onChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });
        e.preventDefault();
    }

    editUser(details){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/users/${this.state.id}?access_token=${access_token}`,
            method: 'put',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
            data: details
        })
            .then( response =>{
                this.setState({
                    alertSuccess: true,
                    password: '',
                    newpassword: ''
                });
                // console.log(response);
            })
            .catch(err => console.log(err));
        // console.log("data",details);
    }

    onSubmit(e){
        let details = {};
        if(this.refs.password.value !== ""){
            if(this.refs.newpassword.value === ""){
                window.alert("Password fields are required!");
            } else if(this.refs.newpassword.value !== this.refs.password.value) {
                window.alert("Passwords didn't match!");
            } else {
                details =  {
                    id:this.state.id,
                    firstName: this.state.name,
                    lastName: this.state.surname,
                    username: this.state.username,
                    roles: this.state.role,
                    email: this.refs.email.value,
                    password: this.refs.password.value,
                };
            }
        } else {
            details =  {
                id:this.state.id,
                firstName: this.state.name,
                lastName: this.state.surname,
                username: this.state.username,
                roles: this.state.role,
                email: this.refs.email.value
            };
        }
        this.editUser(details);
        e.preventDefault();
    }

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        return (
            <div className="form-group col-md-6 m-auto">
                <h2>{lang.SETTINGS}<hr/></h2>
                <h3>{lang.WELCOME}, {this.state.username}</h3>
                {
                    this.state.alertSuccess ? (<div className="alert alert-success">{lang.PROFILE_UPDATED}</div>) : ""
                }

                <form onSubmit={this.onSubmit}>
                    <input type="email" name="email" ref="email" placeholder={lang.EMAIL} className="form-control mb-2" value={this.state.email} onChange={this.onChange} required="required" />
                    <small className="text-danger">{lang.SECURITY_REASONS_PASSWORD}</small>
                    <input type="password" name="password" ref="password" placeholder={lang.NEW_PASSWORD} className="form-control mb-2" value={this.state.password} onChange={this.onChange} />
                    <input type="password" name="newpassword" ref="newpassword" placeholder={lang.CONFIRM_PASSWORD} className="form-control mb-2" value={this.state.newpassword} onChange={this.onChange} />
                    <input type="submit" value={lang.UPDATE} className="btn btn-outline-primary mb-2"/>
                </form>
            </div>
        );
    }
}
export default UserSettingsForm;
