import React, {Component} from "react";
import { Link } from 'react-router-dom';
import cookie from "react-cookies";
import axios from "axios";

class UsersAddForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            roles: [],
            username: '',
            name: '',
            surname: '',
            email: '',
            role: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.getRoles();
    }

    getRoles(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/roles?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://192.168.0.103:3001/",
        })
            .then( response =>{
                this.setState({
                    roles: response.data
                });
            });
    };

    addUser(userDetails){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/users?access_token=${access_token}`,
            method: 'post',
            baseURL: "http://192.168.0.103:3001/",
            data: userDetails
        })
            .then( response =>{
                // console.log(response);
            })
            .catch(err => console.log(err));
        this.props.history.push("/users");
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

    onSubmit(e){
        const userDetails = {
          username: this.state.username,
          firstName: this.state.name,
          lastName: this.state.surname,
          email: this.state.email,
          roles: this.getRoleById(parseInt(this.refs.role.value))
        };
        this.addUser(userDetails);
        e.preventDefault();
    }

    getRoleById(id){
        let role = this.state.roles.filter( role => role.id === id);
        return role;
    }


    render() {
        return (
            <div className="form-group col-md-6 m-auto">
                <h3>Add a user</h3>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="username" ref="username" placeholder="Username" className="form-control mb-2" required="required" value={this.state.username} onChange={this.onChange} />
                    <input type="text" name="name" ref="name" placeholder="Name" className="form-control mb-2" required="required" value={this.state.name} onChange={this.onChange} />
                    <input type="text" name="surname" ref="surname" placeholder="Surname" className="form-control mb-2" required="required" value={this.state.surname} onChange={this.onChange} />
                    <input type="email" name="email" ref="email" placeholder="Email" className="form-control mb-2" required="required" value={this.state.email} onChange={this.onChange} />
                    <select className="form-control mb-2" name="role" ref="role" required="required" value={this.state.role} onChange={this.onChange} >
                        {
                            this.state.roles.map( (role) => (
                                <option key={role.id} value={role.id}>{role.roleName}</option>
                            ))
                        }
                    </select>
                    <input type="submit" value="Add" className="btn btn-outline-primary mb-2"/>
                </form>
                <p><Link to="/users">Back to list</Link></p>
            </div>
        );
    }
}
export default UsersAddForm;
