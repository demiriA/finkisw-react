import React, {Component} from "react";
import "./Upload.css"
import cookie from "react-cookies";
import axios from "axios";
import language from "../../Resources/lang";
import config from '../../Resources/Config';

class ProjectUpload extends Component{

    constructor(){
        super();
        this.state ={
            selectedFile: null
        };
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    };

    getFileUrl(){
        let access_token = cookie.load("USER_SESSION");
        let final='';
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        axios.post(`http://${config.ipAddress}:${config.port}/uploadFile?access_token=${access_token}`,formData)
            .then( res => {
                let link = res.data.fileDownloadUri;
                let result = link.split('/');
                final = result[3]+"/"+result[4];
                this.uploadFile(final);
            });
    }

    uploadFile(file){
        let access_token = cookie.load("USER_SESSION");
        let projectId = this.props.pId;
        const details = {
            id: projectId,
            fileLocation: file
        };

        console.log(details);
        axios.request({
            url:`/api/projects/upload/${projectId}?access_token=${access_token}`,
            method: 'put',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
            data: details
        })
            .then( response => {
                window.alert("Project uploaded successfully!")
                window.location.reload();
            }).catch(err => console.log(err));
    }

    onSubmit = (e) =>{
        console.log(this.state);
        this.getFileUrl();
      e.preventDefault();
    };

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        return(
            <form className="upload-content" onSubmit={this.onSubmit}>
                <small className="text-danger">NOTE: Maximum upload size is 200MB. If the file is more than 200MB, upload a text document with download link from cloud storage!</small>
                <input type="file" name="file" ref="file" required="required" className="btn-upload" onChange={this.fileSelectedHandler}/>
                <input type="submit" className="w-100 btn btn-outline-dark" value={lang.UPLOAD}/>
            </form>
        );
    }
}

export default ProjectUpload