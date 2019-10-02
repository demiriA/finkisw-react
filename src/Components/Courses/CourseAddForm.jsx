import React, {Component} from "react";
import { Link } from 'react-router-dom';
import language from "../../Resources/lang";
import cookie from "react-cookies";
import axios from "axios";
import config from "../../Resources/Config";

class CourseAddForm extends Component{

    constructor(props){
      super(props);
      this.state = {
        name: '',
        year: ''
      };

      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    createCourse(courseDetails){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/courses?access_token=${access_token}`,
            method: 'post',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
            data: courseDetails
        })
            .then( response =>{
                this.props.history.push("/courses");
            })
            .catch(err => console.log(err));
    }

    onSubmit(e){
      const course = {
        name: this.state.name,
        studyYear: this.state.year
      };
      this.createCourse(course);
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
                <h3>{lang.CREATE_NEW}</h3>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" ref="name" placeholder={lang.NAME} className="form-control mb-2" value={this.state.name} onChange={this.onChange} />
                    <input type="text" name="year" ref="year" placeholder={lang.STUDY_YEAR} className="form-control mb-2" value={this.state.year} onChange={this.onChange} />
                    <input type="submit" value={lang.CREATE} className="btn btn-outline-primary mb-2"/>
                </form>
                <p><Link to="/courses">{lang.BACK_TO_LIST}</Link></p>
            </div>
        );
    }
}
export default CourseAddForm;
