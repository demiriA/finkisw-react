import React, {Component} from 'react';
import UpcomingItem from "./UpcomingItem";
import cookie from "react-cookies";
import axios from "axios";
import language from "../../Resources/lang";
import config from '../../Resources/Config';

class Upcoming extends Component{
    constructor(){
        super();
        this.state = {
            id: '',
            role:'',
            projects:[]
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getProjectsByStudent(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/projects/student/${this.state.id}?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response => {
                this.setState({
                    projects: response.data
                });
            });
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
                    id: response.data.id,
                    role: response.data.roles[0].roleName
                });
                if(response.data.roles[0].roleName === "STUDENT_USER"){
                    this.getProjectsByStudent();
                }
            });
    }

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        if(this.state.role !== "STUDENT_USER"){
            return null;
        } else{
            return(
                <div className="alert alert-secondary">
                    <h2><i className="fas fa-file-upload"/> {lang.UPLOADED_PROJECTS}</h2>
                    <hr/>
                    {
                        this.state.projects.map(
                            (project) =>
                                <UpcomingItem key={project.id} project={project} />
                        )
                    }
                </div>
            );
        }
    }
}

export default Upcoming;
