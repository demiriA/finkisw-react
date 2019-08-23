import React, {Component} from "react";
import { Link } from 'react-router-dom';
import UsersTableItem from "./UsersTableItem";


class UsersTable extends Component{
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
                        <UsersTableItem/>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default UsersTable;
