import React, {Component} from "react";
import { Link } from 'react-router-dom';
import language from "../../Resources/lang";

class UsersTableItem extends Component{
    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }

        const {id, username, email, firstName, lastName} = this.props.user;
        const {roleName, description} = this.props.role;
        let role = roleName.toLowerCase().split("_")[0];

        return (
            <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td title={description}>{role}</td>
                <td>
                    <Link to="/users" className="btn btn-sm btn-danger m-1" onClick={this.props.onDelete}>{lang.DELETE}</Link>
                    <Link to={"/users/edit/"+id} className="btn btn-sm btn-success m-1">{lang.EDIT}</Link>
                </td>
            </tr>
        );
    }
}
export default UsersTableItem;
