import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import language from '../../Resources/lang';
import config from "../../Resources/Config";

class UserDetails extends Component{

    constructor(props){
      super(props);
      this.state = {
        users: []
      }
    }

    componentDidMount() {
        this.getAllUsers();
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
              let users = response.data;
                console.log(users[0].roles[0].roleName);
            });
    }

    render(){
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
      let teachers = 0;
      return (
        <div className="col-md-6 mt-3">
          <div className="card">
            <div className="card-header">
                <h3>{lang.USERS_DETAILS}</h3>
            </div>
            <div className="card-body overflow-auto usr-dtls">
              <dl>
                <dt>{lang.ADMINS}:</dt>
                  {this.state.users.map( user => {
                      if(user.roles[0].roleName === "ADMIN_USER"){
                        return <dd key={user.id} className="list-group-item">{user.firstName} {user.lastName}</dd> }
                        return null;
                  })
                  }
                <dt>{lang.TEACHERS}:</dt>
                  {this.state.users.map( user => {
                      if(user.roles[0].roleName === "TEACHER_USER"){
                        teachers++;
                        return <dd key={user.id} className="list-group-item">{user.firstName} {user.lastName}</dd> }
                        return null;
                  })
                  }
              </dl>
            </div>
            <div className="card-footer">
              <p>{lang.TOTAL_USERS}: {this.state.users.length}, {lang.TEACHERS}: {teachers}</p>
            </div>
          </div>
        </div>
      );
    }

}

export default UserDetails;
