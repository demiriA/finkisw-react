import React, {Component} from "react";
import { Link } from 'react-router-dom';
import language from "../../Resources/lang";
import config from "../../Resources/Config";

class ProjectTableItem extends Component{
    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }

        const {id, name, status, fileLocation} = this.props.project;
        const {username, firstName, lastName} = this.props.project.user;

        let statClass = "primary";
        if (status === "Accepted"){
            statClass = "success";
        } else if (status === "Rejected"){
            statClass = "danger";
        }


        return (
            <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{firstName} {lastName}</td>
                <td>{name}</td>
                <td className={"text-"+statClass}><i className="far fa-check-circle"> </i> {status}</td>
                <td>{
                    fileLocation === null ? <font><i className="fas fa-download"/> {lang.NOT_UPLOADED}</font> : <a href={"http://"+config.ipAddress+":"+config.port+"/"+fileLocation} download><i className="fas fa-download"/> {lang.DOWNLOAD}</a>
                }</td>
                <td>
                    <Link to={"/project/preview/"+id} className="btn btn-sm btn-primary m-1">{lang.PREVIEW}</Link>
                </td>
            </tr>
        );
    }
}
export default ProjectTableItem;
