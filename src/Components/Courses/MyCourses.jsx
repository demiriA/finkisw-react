import React, {Component} from "react";
import './Courses.css'
import MyCoursesItem from "./MyCoursesItem";
import UserDetails from '../Dashboard/UserDetails';
import CourseDetails from '../Dashboard/CourseDetails';
import cookie from "react-cookies";
import axios from "axios";
class MyCourses extends Component{
    constructor(){
        super();
        this.state = {
            role: '',
            courses:[
                {
                    id: 1,
                    name: "Course 1"
                },
                {
                    id: 2,
                    name: "Course 2"
                }
            ]
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/current?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://192.168.0.103:3001/",
        })
            .then( response => {
                this.setState({
                    role: response.data.roles[0].roleName
                });
            });
    }

    render() {
        if(this.state.role === "ADMIN_USER"){
            return (
                <div className="container-fluid">
                    <h2>Admin dashoard<hr/></h2>
                    <div className="row">
                      <UserDetails />
                      <CourseDetails />
                    </div>
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <h2><i className="fas fa-tasks"/> My Courses</h2>
                    <hr/>
                    <div className="row">
                        {
                            this.state.courses.map(
                                (course) =>
                                    <MyCoursesItem key={course.id} course={course}/>
                            )
                        }
                    </div>
                </React.Fragment>
            );
        }
    }
}
export default MyCourses;
