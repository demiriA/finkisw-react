import React, {Component} from 'react';
import cookie from "react-cookies";
import axios from "axios";
import config from "../../Resources/Config";
import language from "../../Resources/lang";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";

class ProjectEditForm extends Component{

    constructor(){
        super();
        this.state = {
            name:'',
            description:'',
            id: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getProject();
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
                    name: response.data.name,
                    description: response.data.description,
                    id: response.data.id
                });
            }).catch(err => console.log(err));
    }

    editProject(projectDetails){
        let access_token = cookie.load("USER_SESSION");
        let projectId = this.props.match.params.id;
        axios.request({
            url:`/api/projects/${projectId}?access_token=${access_token}`,
            method: 'put',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
            data: projectDetails
        })
            .then( response => {
                this.props.history.push("/project/preview/"+this.state.id);
            }).catch(err => console.log(err));
    }

    onSubmit(e){
        const project = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description
        };
        this.editProject(project);
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
                <h2>Edit project</h2>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" ref="name" placeholder="Name" className="form-control mb-2" value={this.state.name} onChange={this.onChange} />
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
                    <input type="submit" value={lang.UPDATE} className="btn btn-outline-dark mb-2 w-100"/>
                </form>
            </div>
        );
    }
}
export default ProjectEditForm;