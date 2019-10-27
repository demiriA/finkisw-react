import React, {Component} from 'react';
import cookie from "react-cookies";
import axios from "axios";
import config from "../../Resources/Config";
import language from "../../Resources/lang";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";

class ProjectAddForm extends Component{

    constructor(){
        super();
        this.state = {
            name:'',
            description:'',
            user:'',
            course:'',
            accept: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    createProject(projectDetails){
        if(!this.state.accept){
            window.alert("Please confirm that this is your own work!")
        } else {
            let access_token = cookie.load("USER_SESSION");
            axios.request({
                url:`/api/projects?access_token=${access_token}`,
                method: 'post',
                baseURL: "http://"+config.ipAddress+":"+config.port+"/",
                data: projectDetails
            })
                .then( response =>{
                    // this.props.history.push("/users");
                    window.location.reload();
                    // console.log(response);
                })
                .catch(err => console.log(err));
        }
    }

    componentDidMount() {
        this.getUserDetails(this.props.userId);
        this.getCourseDetails(this.props.courseId);
    }

    getUserDetails(userId){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url: `/api/current?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://" + config.ipAddress + ":" + config.port + "/",
        })
            .then(response => {
                this.setState({
                    user: response.data
                });
            }).catch(err => console.log(err));
    }

    getCourseDetails(courseId){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/courses/${courseId}?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        }).then( response => {
            this.setState({
                course: response.data
            });
        }).catch(err => console.log(err));
    }

    onSubmit(e){
        const project = {
            name: this.state.name,
            description: this.state.description,
            user: this.state.user,
            course: this.state.course
        };

        this.createProject(project);
       e.preventDefault();
    }

    onChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
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

        return(
            <div>
                <hr/>
                <h2>{lang.CREATE}</h2>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" ref="name" placeholder={lang.NAME} className="form-control mb-2" onChange={this.onChange} />
                    <CKEditor
                        editor={ ClassicEditor }
                        data={this.state.description ? this.state.description : ""}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            this.setState({
                                description:data
                            });
                            // console.log(data);
                        } }
                    /><br/>
                    <label><input name="accept" type="checkbox" checked={this.state.accept} onChange={this.onChange} /> {lang.THIS_ASSIGMENT_IS_MY_OWN_WORK}</label><br/>
                    <input type="submit" value={lang.CREATE} className="btn btn-outline-dark mb-2 w-100"/>
                </form>
            </div>
        );
    }
}
export default ProjectAddForm;