import React, {Component} from "react";
import { Link } from 'react-router-dom';
import cookie from "react-cookies";
import axios from "axios";
import language from "../../Resources/lang";
import config from "../../Resources/Config";

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
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
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
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
            data: userDetails
        })
            .then( response =>{
                this.props.history.push("/users");
                // console.log(response);
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
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        return (
            <div className="form-group col-md-6 m-auto">
                <h3>{lang.ADD_A_USER}</h3>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="username" ref="username" placeholder={lang.USERNAME} className="form-control mb-2" required="required" value={this.state.username} onChange={this.onChange} />
                    <input type="text" name="name" ref="name" placeholder={lang.NAME} className="form-control mb-2" required="required" value={this.state.name} onChange={this.onChange} />
                    <input type="text" name="surname" ref="surname" placeholder={lang.SURNAME} className="form-control mb-2" required="required" value={this.state.surname} onChange={this.onChange} />
                    <input type="email" name="email" ref="email" placeholder={lang.EMAIL} className="form-control mb-2" required="required" value={this.state.email} onChange={this.onChange} />
                    <select className="form-control mb-2" name="role" ref="role" required="required" value={this.state.role} onChange={this.onChange} >
                        {
                            this.state.roles.map( (role) => (
                                <option key={role.id} value={role.id}>{role.roleName}</option>
                            ))
                        }
                    </select>
                    <input type="submit" value={lang.ADD} className="btn btn-outline-primary mb-2"/>
                </form>
                <p><Link to="/users">{lang.BACK_TO_LIST}</Link></p>
            </div>
        );
    }
}
export default UsersAddForm;
