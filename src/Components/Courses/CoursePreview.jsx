import React, {Component} from 'react';
import {Link} from "react-router-dom";
import MyHomeworks from "../Homeworks/MyHomeworks";
import cookie from "react-cookies";
import axios from "axios";
import config from "../../Resources/Config";
import language from "../../Resources/lang";

class CoursePreview extends Component {

    constructor(){
        super();
        this.state = {
            role:'',
            course: ''
        }
    }

    componentDidMount() {
        this.getCourse();
        this.getUser();
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

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.match.params.id !== this.props.match.params.id){
            this.forceUpdate(this.getCourse);
        }
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
                course: response.data
            });
        });
    }

    render() {

        const {id, name, info} = this.state.course;

        function markup(info) {
            return {__html: info};
        }

        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        return(
          <div className="sw-course">
              <h1>
                  <i className="fas fa-angle-double-right"/>
                  <Link to={"/course/"+id} className="course-link-prev"> {name}</Link>
              </h1><hr/>
              <ul className="nav nav-tabs nav-justified">
                  <li className="nav-item">
                      <a className="nav-link active" href="#homeworks" data-toggle="tab">{lang.SEMINAR_WORK}</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#info" data-toggle="tab">{lang.INFO}</a>
                  </li>
              </ul>
              <div className="tab-content">
                  <div className="tab-pane active" id="homeworks">
                      <MyHomeworks/>
                  </div>
                  <div className="tab-pane" id="info">
                      {
                          this.state.role === "TEACHER_USER" ? (<Link to={"/courses/editInfo/"+id} className="btn btn-sm btn-primary m-1 float-right">{lang.EDIT_INFO}</Link>) : ""
                      }
                      <br/>
                      <div dangerouslySetInnerHTML={markup(info)}></div>
                  </div>
              </div>
          </div>
        );
    }
}

export default CoursePreview;