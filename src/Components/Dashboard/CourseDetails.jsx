import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

class CourseDetails extends Component{

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
            baseURL: "http://192.168.0.103:3001/",
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
      return (
        <div className="col-md-6 mt-3">
          <div className="card">
            <div className="card-header">
                <h3>Courses details</h3>
            </div>
            <div className="card-body overflow-auto usr-dtls">
              <dl>
                <dt>Course name</dt>
                  <dd>Teacher One</dd>
                  <dd>Teacher Two</dd>
                <dt>Course name</dt>
                  <dd>Teacher Two</dd>
                <dt>Course name</dt>
                  <dd>Teacher Two</dd>
                  <dd>Teacher One</dd>
              </dl>
            </div>
            <div className="card-footer">
              <p>Total courses: {"3"}</p>
            </div>
          </div>
        </div>
      );
    }

}

export default CourseDetails;
