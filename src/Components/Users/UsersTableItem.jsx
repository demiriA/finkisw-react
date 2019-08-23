import React, {Component} from "react";
import { Link } from 'react-router-dom';

class UsersTableItem extends Component{
    render() {
        return (
            <tr>
                <td>1</td>
                <td>163055</td>
                <td>Albin</td>
                <td>Baftijarovski</td>
                <td>albin.baftijarovski@students.finki.ukim.mk</td>
                <td>ADMIN</td>
                <td>
                    <Link to="/users" className="btn btn-sm btn-danger m-1" onClick={this.props.deleteCategory}>Delete</Link>
                    <Link to={"/users/edit/1"} className="btn btn-sm btn-success m-1">Edit</Link>
                </td>
            </tr>
        );
    }
}
export default UsersTableItem;
