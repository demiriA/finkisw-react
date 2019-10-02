import React, {Component} from "react";
import { Link } from 'react-router-dom';
import UsersTableItem from "./UsersTableItem";
import cookie from 'react-cookies';
import axios from 'axios';
import language from "../../Resources/lang";
import config from "../../Resources/Config";

class UsersTable extends Component{

    constructor(){
        super();
        this.state = {
            users: []
        };
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.getAllUsers();
    }

    componentWillUnmount() {
        this.setState({
            users:[]
        })
    }

    getAllUsers(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/users?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response => {
                this.setState({
                   users: response.data
                });
            });
    }

    onDelete(userId){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/users/${userId}?access_token=${access_token}`,
            method: 'delete',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        }).then( response => {
            this.setState({
                users: [...this.state.users.filter( user => user.id !== userId)]
            });
        });
    }

    refresh(){
      window.location.reload();
    }

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        return (
            <div className="container">
                <h3>{lang.USERS}</h3>
                <Link to="/users/create" className="btn btn-outline-primary mb-2">{lang.ADD_NEW}</Link>
                <Link to="" className="float-right" onClick={this.refresh}>{lang.REFRESH}</Link>
                <table className="table table-bordered table-striped" id="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>{lang.USERNAME}</th>
                            <th>{lang.NAME}</th>
                            <th>{lang.SURNAME}</th>
                            <th>{lang.EMAIL}</th>
                            <th>{lang.ROLE}</th>
                            <th>{lang.ACTIONS}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map( (user) => (
                            <UsersTableItem key={user.id} user={user} role={user.roles[0]} onDelete={this.onDelete.bind(this,user.id)}/>
                            ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default UsersTable;
