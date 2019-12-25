import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import cookie from 'react-cookies';
import language from "../../Resources/lang";
import config from "../../Resources/Config";


class UsersEditForm extends Component{

    constructor(){
        super();
        this.state = {
            roles:[],
            id:'',
            email: '',
            password: '',
            username:'',
            name:'',
            surname:'',
            role:''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.getRoles();
        this.getUser();
    }

    getRoles(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/roles?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response =>{
                this.setState({
                   roles: response.data
                });
            });
    };

    getUser(){
        let access_token = cookie.load("USER_SESSION");
        let userId = this.props.match.params.id;
        axios.request({
            url:`/api/users/${userId}?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response =>{
                // console.log("response",response.data.roles[0].roleName);
                this.setState({
                    id: response.data.id,
                    password: response.data.password,
                    username: response.data.username,
                    email: response.data.email,
                    name: response.data.firstName,
                    surname: response.data.lastName,
                    role: response.data.roles[0].roleName
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
                console.log(response);
            })
            .catch(err => console.log(err));
        console.log("data",details);
        this.props.history.push("/users");
    }

    onSubmit(e){
        const details =  {
            id: this.state.id,
            username: this.state.username,
            email: this.state.email,
            firstName: this.refs.name.value,
            lastName: this.refs.surname.value,
            roles: this.getRoleById(parseInt(this.refs.role.value))
        };
        this.editUser(details);
        e.preventDefault();
    }

    getRoleById(id){
        let role = this.state.roles.filter( role => role.id === id);
        return role;
    }

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        return (
            <div className="form-group col-md-6 m-auto">
                <h3>{lang.EDIT} {this.state.username} ({this.state.role.toLowerCase().split("_")[0]})</h3>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" ref="name" placeholder={lang.NAME} className="form-control mb-2" value={this.state.name} onChange={this.onChange} required="required"/>
                    <input type="text" name="surname" ref="surname" placeholder={lang.SURNAME} className="form-control mb-2" value={this.state.surname} onChange={this.onChange} required="required"/>
                    <select className="form-control mb-2" name="role" ref="role" onChange={this.onChange} required="required" >
                        {
                            this.state.roles.map( (role) =>
                                this.state.role === role.roleName ? <option key={role.id} value={role.id} selected="selected" >{role.roleName}</option> : <option key={role.id} value={role.id}>{role.roleName}</option>
                            )
                        }
                    </select>
                    <input type="submit" value={lang.UPDATE} className="btn btn-outline-primary mb-2"/>
                </form>
                <p><Link to="/users">{lang.BACK_TO_LIST}</Link></p>
            </div>
        );
    }
}
export default UsersEditForm;
