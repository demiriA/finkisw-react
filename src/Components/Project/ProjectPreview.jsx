import React, {Component} from "react";
import cookie from "react-cookies";
import axios from "axios";
import config from "../../Resources/Config";
import language from "../../Resources/lang";
import {Link} from "react-router-dom";
import './ProjectPrint.css'

class ProjectPreview extends Component{

    constructor(){
        super();
        this.state = {
            project: '',
            course:'',
            user: '',
            feedback: '',
            role: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getUser();
        this.getProject();
    }

    getUser(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/current/?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response => {
                this.setState({
                    role: response.data.roles[0].roleName
                });
            }).catch(err => console.log(err));
    }

    getProject(){
        let access_token = cookie.load("USER_SESSION");
        let projectId = this.props.match.params.id;
        axios.request({
            url:`/api/projects/${projectId}?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response => {
                this.setState({
                    project: response.data,
                    course: response.data.course,
                    user: response.data.user
                });
            }).catch(err => console.log(err));
    };

    onReview = (state) => {
        let access_token = cookie.load("USER_SESSION");
        let projectId = this.state.project.id;
        const projectDetails = {
            id: projectId,
            feedback: this.state.feedback
        };
        axios.request({
            url:`/api/projects/feedback/${projectId}/${state}?access_token=${access_token}`,
            method: 'put',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
            data: projectDetails
        })
            .then( response => {
                this.props.history.push("/course/"+this.state.course.id);
            }).catch(err => console.log(err.data));
    };

    onChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });
        e.preventDefault();
    }

    onPrint(){
      window.print();
    };

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        const {name, description, editedDate, feedback, fileLocation} = this.state.project;
        function markup(text) {
            return {__html: text};
        }
        return(
            <React.Fragment>
                <div className="card p-2 m-2">
                    <div className="text-center mb-5">
                        <h1>{name}</h1>
                        <small>{this.state.course.name}</small>
                    </div>
                    <div className="m-auto col-md-11">
                        <div dangerouslySetInnerHTML={markup(description)}></div>
                        <br/>
                        <p><b>{lang.FEEDBACK}: </b>{feedback}</p>
                    </div>
                    <div className="mt-5">
                        <p className="float-left">{this.state.user.firstName + " "+ this.state.user.lastName}, <b>{this.state.user.username}</b></p>
                        <p className="float-right">{editedDate}</p>
                    </div>
                </div>
                <p className="float-right print-none">{
                    fileLocation === null ? "" :
                        (<a href={"http://"+config.ipAddress + ":" + config.port + "/" + fileLocation}>{lang.DOWNLOAD + " " + lang.FILE} | </a>)
                }
                <Link to={"#"} onClick={this.onPrint}>{lang.PRINT_PROJECT}</Link>
                </p>
                {
                    this.state.role === "TEACHER_USER" ?  (
                      this.state.project.status !== "Accepted" ?
                            (
                                <div className="print-none w-100 mb-2 p-2">
                                    <div className="mt-2 mb-2">
                                        <textarea name="feedback" className="w-100 form-control" rows="5" onChange={this.onChange} placeholder={lang.FEEDBACK}/>
                                    </div>
                                    <input type="button" onClick={() => this.onReview(1)} className="btn btn-outline-success mr-2" value={lang.ACCEPT}/>
                                    <input type="button" onClick={() => this.onReview(0)} className="btn btn-outline-danger" value={lang.REJECT} />
                                </div>
                            ) : ""
                    ) : ""
                }
                <Link to={"/course/"+this.state.course.id} className="print-none" >{lang.BACK}</Link>
            </React.Fragment>
        );
    }
}

export default ProjectPreview;