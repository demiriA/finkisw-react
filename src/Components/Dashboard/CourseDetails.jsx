import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import language from '../../Resources/lang';
import config from "../../Resources/Config";

class CourseDetails extends Component{

    constructor(props){
      super(props);
      this.state = {
        courses: []
      }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/courses?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/"
        })
            .then( response => {
                this.setState({
                    courses: response.data
                });
            })
            .catch( err =>{
                console.log(err);
            });
    }

    render(){
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
      return (
        <div className="col-md-6 mt-3">
          <div className="card">
            <div className="card-header">
                <h3>{lang.COURSES_DETAILS}</h3>
            </div>
            <div className="card-body overflow-auto usr-dtls">
              <dl>
                  {
                      this.state.courses.map( (course) =>(
                          <React.Fragment key={course.id}>
                              <dt>{course.name}</dt>
                              {
                                  course.teachers.map( (teacher) => (
                                      <dd key={teacher.id}>{teacher.username} | {teacher.firstName} {teacher.lastName}</dd>
                                  ))
                              }
                          </React.Fragment>
                      ))
                  }
              </dl>
            </div>
            <div className="card-footer">
              <p>{lang.TOTAL_COURSES}: {this.state.courses.length}</p>
            </div>
          </div>
        </div>
      );
    }

}

export default CourseDetails;
