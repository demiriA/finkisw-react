import React, {Component} from 'react';
import UpcomingItem from "./UpcomingItem";
import cookie from "react-cookies";
import axios from "axios";

class Upcoming extends Component{
    constructor(){
        super();
        this.state = {
            role:'',
            homeworks:[
                {
                    id: 1,
                    name: "Homework 1",
                    course: "Course 2",
                    expire: "31 Aug, 23:59"
                },
                {
                    id: 2,
                    name: "Homework 2",
                    course: "Course 1",
                    expire: "23 Sep, 23:59"
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
        if(this.state.role !== "STUDENT_USER"){
            return null;
        } else{
            return(
                <div className="alert alert-secondary">
                    <h2><i className="fas fa-file-upload"/> Upcoming uploads</h2>
                    <hr/>
                    <div className="row">
                        {
                            this.state.homeworks.map(
                                (homework) =>
                                    <UpcomingItem key={homework.id} homework={homework} />
                            )
                        }
                    </div>
                </div>
            );
        }
    }
}

export default Upcoming;
