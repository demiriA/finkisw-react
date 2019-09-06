import React, {Component} from "react";
import { Link } from 'react-router-dom';
import UsersTableItem from "./UsersTableItem";
import cookie from 'react-cookies';
import axios from 'axios';


class UsersTable extends Component{

    constructor(){
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/users?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://localhost:3001/",
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
            baseURL: "http://localhost:3001/",
        }).then( response => {
            this.setState({
                users: [...this.state.users.filter( user => user.id !== userId)]
            });
        });
    }

    render() {
        return (
            <div className="container">
                <h3>Users</h3>
                <Link to="/users/create" className="btn btn-outline-primary mb-2">Add new</Link>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
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
