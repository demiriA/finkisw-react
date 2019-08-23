import React, {Component} from "react";
import { Link } from 'react-router-dom';

class UsersAddForm extends Component{

    render() {
        return (
            <div className="form-group col-md-6 m-auto">
                <h3>Add a user</h3>
                <form>
                    <input type="text" name="username" ref="username" placeholder="Username" className="form-control mb-2" />
                    <input type="text" name="name" ref="name" placeholder="Name" className="form-control mb-2" />
                    <input type="text" name="surname" ref="surname" placeholder="Surname" className="form-control mb-2" />
                    <input type="email" name="email" ref="email" placeholder="Email" className="form-control mb-2" />
                    <input type="password" name="password" ref="password" placeholder="Password" className="form-control mb-2" />
                    <select className="form-control mb-2" name="role" ref="role">
                        <option value="ADMIN">ADMIN</option>
                        <option value="TEACHER">TEACHER</option>
                        <option value="STUDENT">STUDENT</option>
                    </select>
                    <input type="submit" value="Add" className="btn btn-outline-primary mb-2"/>
                </form>
                <p><Link to="/users">Back to list</Link></p>
            </div>
        );
    }
}
export default UsersAddForm;
