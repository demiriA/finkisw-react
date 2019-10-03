import React, {Component} from "react";
import {Link} from "react-router-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import cookie from 'react-cookies';
import axios from 'axios';
import language from "../../Resources/lang";
import config from "../../Resources/Config";

class CourseEditInfoForm extends Component{

    constructor(){
        super();
        this.state = {
            id:'',
            info:''
        };
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
            // console.log(response.data);
            this.setState({
                id: response.data.id,
                info: response.data.info
            });
        });
    }

    editInfo(info){
        // console.log(info);
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/courses/info/${this.state.id}?access_token=${access_token}`,
            method: 'put',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
            data: info
        }).then( response => {
            this.props.history.push("/course/"+this.state.id);
           // console.log(response);
        })
            .catch(err =>{
                console.log(err);
            });
    }

    onSubmit(e){
        const info = {
            id: this.state.id,
            info: this.state.info
        };
        this.editInfo(info);
        e.preventDefault();
    }

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        return (
            <div className="form-group col-md-12 m-auto">
                <h3>{lang.EDIT_INFO}</h3>
                <form onSubmit={this.onSubmit}>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={this.state.info ? this.state.info : ""}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            this.setState({
                                info:data
                            });
                            // console.log(data);
                        } }
                    />
                    <br/>
                    <input type="submit" value={lang.UPDATE} className="btn btn-outline-primary mb-2"/>
                </form>
                <p><Link to={"/course/"+this.state.id}>{lang.BACK}</Link></p>
            </div>
        );
    }
}
export default CourseEditInfoForm;
