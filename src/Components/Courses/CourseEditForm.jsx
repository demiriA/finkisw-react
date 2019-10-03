import React, {Component} from "react";
import {Link} from "react-router-dom";
import language from "../../Resources/lang";
import cookie from "react-cookies";
import axios from "axios";
import config from "../../Resources/Config";

class CourseEditForm extends Component{

    constructor(){
        super();
        this.state = {
            id:'',
            name: '',
            year: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.getCourse();
    }

    getCourse(){
        let access_token = cookie.load("USER_SESSION");
        let courseId = this.props.match.params.id;
        axios.request({
            url:`/api/courses/${courseId}?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        }).then( response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                year: response.data.studyYear
            });
        });
    }

    editCourse(courseDetails){
        // console.log(courseDetails);
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/courses/${this.state.id}?access_token=${access_token}`,
            method: 'put',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
            data: courseDetails,
            headers: {'Content-type': 'application/json; charset=utf-8'}
        }).then( response => {
            this.props.history.push("/courses");
            // console.log(response);
        })
            .catch(err =>{
                console.log(err);
            });
    }

    onSubmit(e){
        const course = {
            id: this.state.id,
            name: this.state.name,
            studyYear: this.state.year
        };
        this.editCourse(course);
        e.preventDefault();
    }

    onChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]:value
        });
        e.preventDefault();
    }
    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        return (
            <div className="form-group col-md-6 m-auto">
                <h3>{lang.EDIT} {this.state.name}</h3>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" ref="name" placeholder={lang.NAME} className="form-control mb-2" value={this.state.name} onChange={this.onChange}/>
                    <input type="text" name="year" ref="year" placeholder={lang.STUDY_YEAR} className="form-control mb-2" value={this.state.year} onChange={this.onChange}/>
                    <input type="submit" value={lang.UPDATE} className="btn btn-outline-primary mb-2"/>
                </form>
                <p><Link to="/courses">{lang.BACK_TO_LIST}</Link></p>
            </div>
        );
    }
}
export default CourseEditForm;
