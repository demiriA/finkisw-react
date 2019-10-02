import React, {Component} from "react";
import './Courses.css'
import MyCoursesItem from "./MyCoursesItem";
import UserDetails from '../Dashboard/UserDetails';
import CourseDetails from '../Dashboard/CourseDetails';
import cookie from "react-cookies";
import axios from "axios";
import language from "../../Resources/lang";
import config from "../../Resources/Config";

class MyCourses extends Component{
    constructor(){
        super();
        this.state = {
            role: '',
            courses:[]
        }
    }

    componentDidMount() {
        this.getUser();
        this.getAllCourses();
    }

    getUser(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/current?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response => {
                this.setState({
                    role: response.data.roles[0].roleName
                });
            });
    }

    getAllCourses(){
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

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        if(this.state.role === "ADMIN_USER"){
            return (
                <div className="container-fluid">
                    <h2>{lang.ADMIN_DASHBOARD}<hr/></h2>
                    <div className="row">
                      <UserDetails />
                      <CourseDetails />
                    </div>
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <h2><i className="fas fa-tasks"/> {lang.MY_COURSES}</h2>
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
