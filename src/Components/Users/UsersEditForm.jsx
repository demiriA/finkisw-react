import React, {Component} from "react";
import {Link} from "react-router-dom";

class UsersEditForm extends Component{

    render() {
        return (
            <div className="form-group col-md-6 m-auto">
                <h3>Edit 163055</h3>
                <form>
                    <input type="text" name="username" ref="username" placeholder="Username" className="form-control mb-2" value="163055"/>
                    <input type="text" name="name" ref="name" placeholder="Name" className="form-control mb-2" value="Albin" />
                    <input type="text" name="surname" ref="surname" placeholder="Surname" className="form-control mb-2" value="Baftijarovski" />
                    <input type="email" name="email" ref="email" placeholder="Email" className="form-control mb-2" value="albin.baftijarovski@students.finki.ukim.mk" />
                    <input type="password" name="password" ref="password" placeholder="Password" className="form-control mb-2" disabled="disabled"/>
                    <select className="form-control mb-2" name="role" ref="role">
                        <option value="ADMIN">ADMIN</option>
                        <option value="TEACHER">TEACHER</option>
                        <option value="STUDENT">STUDENT</option>
                    </select>
                    <input type="submit" value="Update" className="btn btn-outline-primary mb-2"/>
                </form>
                <p><Link to="/users">Back to list</Link></p>
            </div>
        );
    }
}
export default UsersEditForm;
