import React, {Component} from "react";
import cookie from "react-cookies";
import axios from "axios";
import language from "../../Resources/lang";
import config from "../../Resources/Config";
import DashItem from "./DashItem";
import {Link} from "react-router-dom";

class CourseEditTeachers extends Component{
    constructor(){
        super();
        this.state = {
            user: '',
            course:'',
            currentUsers:[],
            allUsers:[]
        };
    }

    componentDidMount() {
        this.getCourse();
        this.getAllUsers();
    }

    getCourse(){
        let access_token = cookie.load("USER_SESSION");
        let courseId = this.props.match.params.id;
        let type = this.props.match.params.type;
        axios.request({
            url:`/api/courses/${courseId}?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/"
        })
            .then( response => {
                this.setState({
                    course: response.data
                });
                type === "t" ? (this.setState({currentUsers: response.data.teachers})) : (this.setState({currentUsers: response.data.students}))
            })
            .catch( err =>{
                console.log(err);
            });
    }

    getAllUsers(){
        let access_token = cookie.load("USER_SESSION");
        let courseId = this.props.match.params.id;
        let type = this.props.match.params.type;
        axios.request({
            url:`/api/courses/othersUsers/${type}/${courseId}?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response => {
                this.setState({
                    allUsers: response.data
                })
            });
    }

    onAdd = (userId) =>{
        let cUsers = this.state.currentUsers;
        let oUsers = this.state.allUsers;
        let user = oUsers.filter( u => u.id === userId)[0];
        cUsers.push(user);
        this.setState({
            currentUsers: cUsers,
            allUsers: oUsers.filter( u => u.id !== userId)
        });
        this.forceUpdate();
    };

    onRemove = (userId) =>{
        let cUsers = this.state.currentUsers;
        let oUsers = this.state.allUsers;
        let user = cUsers.filter( u => u.id === userId)[0];
        oUsers.push(user);
        this.setState({
            allUsers: oUsers,
            currentUsers: cUsers.filter( u => u.id !== userId)
        });
        this.forceUpdate();
    };

    onSave = () =>{
        let access_token = cookie.load("USER_SESSION");
        let courseId = this.props.match.params.id;
        let type = this.props.match.params.type;

        axios.request({
            url:`/api/courses/users/${type}/${courseId}?access_token=${access_token}`,
            method: 'put',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
            data: this.state.currentUsers
        })
            .then( response =>{
                this.props.history.push("/courses");
            })
            .catch(err => console.log(err));
    };

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        let type = this.props.match.params.type;
        const {name} = this.state.course;
        let title="";
        type === "s" ? title=lang.STUDENTS : title=lang.TEACHERS;
        return (
            <div className="container-fluid">
                <h2>{lang.EDIT} {title} - {name}<hr/></h2>
                <div className="row">
                    <div className="w-100">
                        <DashItem title={lang.CURRENT+" "+title} data={this.state.currentUsers} total={this.state.currentUsers.length} positive={false} onAdd={this.onAdd} onRemove={this.onRemove}/>
                        <DashItem title={lang.ALL+" "+title} data={this.state.allUsers} total={this.state.allUsers.length} positive={true} onAdd={this.onAdd} onRemove={this.onRemove}/>
                        <input type="button" onClick={this.onSave} value={lang.SAVE} className="btn btn-outline-primary mb-2"/>
                    </div>
                </div>
                <Link to={"/courses"} >{lang.BACK}</Link>
            </div>
        );
    }
}
export default CourseEditTeachers;
