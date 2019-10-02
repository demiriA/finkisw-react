import React, {Component} from "react";
import { Link } from 'react-router-dom';
import CourseTableItem from "./CourseTableItem";
import language from "../../Resources/lang";
import config from "../../Resources/Config";
import cookie from "react-cookies";
import axios from "axios";


class CourseTable extends Component{

    constructor(){
        super();
        this.state = {
            courses: [],
            role: '',
            username: ''
        };
    }

    componentDidMount() {
        this.getAllCourses();
        this.userDetails();
    }

    userDetails(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/current?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response => {
                this.setState({
                    role: response.data.roles[0],
                    username: response.data.username
                })
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

    onDelete(courseId){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/courses/${courseId}?access_token=${access_token}`,
            method: 'delete',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        }).then( response => {
            this.setState({
                courses: [...this.state.courses.filter( course => course.id !== courseId)]
            });
        });
    }

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        return (
            <div className="container">
                <h3>{lang.COURSES}</h3>
                {
                    this.state.role.roleName === "ADMIN_USER" ? <Link to="/courses/create" className="btn btn-outline-primary mb-2">{lang.CREATE_NEW}</Link> : ""
                }
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>{lang.COURSE_NAME}</th>
                        <th>{lang.STUDY_YEAR}</th>
                        <th>{lang.TEACHERS}</th>
                        <th>{lang.ACTIONS}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.courses.map((course) => (
                            <CourseTableItem key={course.id} course={course} onDelete={this.onDelete.bind(this,course.id)} role={this.state.role.roleName} />
                        ))
                    }

                    </tbody>
                </table>
            </div>
        );
    }
}
export default CourseTable;
