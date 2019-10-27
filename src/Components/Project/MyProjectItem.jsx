import React, {Component} from 'react';
import {Link} from "react-router-dom";
import language from "../../Resources/lang";
import ProjectUpload from "./ProjectUpload";
import config from "../../Resources/Config";

class MyProjectItem extends Component{
    render() {

        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        const { id, name, editedDate, feedback, status, description, fileLocation } = this.props.project;

        function button(){
            if (status === "Accepted"){
                return <ProjectUpload pId={id}/>
            }
            return <Link className="btn btn-dark btn-lg" to={"/project/edit/"+id}>{lang.EDIT}</Link>
        }
        function markup(description) {
            return {__html: description};
        }
        return(
            <div className="card mt-5 p-3">
                <div className="row">
                    <div className="col-md-6">
                        <h2>{name}</h2>
                        <div dangerouslySetInnerHTML={markup(description)}></div>
                    </div>
                    <div className="col-md-6">
                        <p>{lang.UPDATED}: {editedDate}</p>
                        <p>{lang.STATUS}:
                            {
                                status === "Accepted" ? <font className="text-success"> {status}</font> :
                                    status === "Rejected" ? <font className="text-danger"> {status}</font> : <font className="text-primary"> {status}</font>
                            }
                        </p>
                        {
                            status === "Not reviewed" ? "" : <p>{lang.FEEDBACK}: {feedback}</p>
                        }
                        {
                            fileLocation === null ? "" : <a href={"http://"+config.ipAddress + ":" + config.port + "/" + fileLocation}><i className="fa fa-download"/> {lang.FILE}</a>
                        }
                    </div>
                </div>
                {button()}
            </div>
        );
    }
}
export default MyProjectItem;