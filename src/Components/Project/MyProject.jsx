import React, {Component} from 'react';
import MyProjectItem from "./MyProjectItem";
import cookie from "react-cookies";
import axios from "axios";
import config from "../../Resources/Config";
import ProjectAddForm from "./ProjectAddForm";

class MyProject extends Component{

    constructor(){
        super();
        this.state = {
            id: '',
            project:[]
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url: `/api/current?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://" + config.ipAddress + ":" + config.port + "/",
        })
            .then(response => {
                this.setState({
                    id: response.data.id
                });
                if(response.data.roles[0].roleName === "STUDENT_USER"){
                    this.getProjectsByStudentAndCourse();
                }
            });
    }

    getProjectsByStudentAndCourse(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/projects/student/${this.state.id}/course/${this.props.courseId}?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response => {
                this.setState({
                    project: response.data
                });
            });
    }

    render() {
        if(this.state.project.length === 0){
            return <ProjectAddForm userId={this.state.id} courseId={this.props.courseId} />
        } else {
            return <MyProjectItem project={this.state.project} />
        }
    }
}
export default MyProject;