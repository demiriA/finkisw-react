import React, {Component} from "react";
import { Link } from 'react-router-dom';

class UsersTableItem extends Component{
    render() {
        const {id, username, email, firstName, lastName} = this.props.user;
        const {roleName, description} = this.props.role;

        return (
            <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td title={description}>{roleName}</td>
                <td>
                    <Link to="/users" className="btn btn-sm btn-danger m-1" onClick={this.props.onDelete}>Delete</Link>
                    <Link to={"/users/edit/"+id} className="btn btn-sm btn-success m-1">Edit</Link>
                </td>
            </tr>
        );
    }
}
export default UsersTableItem;
