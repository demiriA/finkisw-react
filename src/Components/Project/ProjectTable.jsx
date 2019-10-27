import React, {Component} from "react";
import language from "../../Resources/lang";
import config from "../../Resources/Config";
import cookie from "react-cookies";
import axios from "axios";
import ProjectTableItem from "./ProjectTableItem";


class ProjectTable extends Component{

    constructor(){
        super();
        this.state = {
           projects: []
        }
    }

    componentDidMount() {
        this.getProjects();
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.course !== this.props.course){
            this.forceUpdate(this.getProjects);
        }
    }

    getProjects(){
        let access_token = cookie.load("USER_SESSION");
        axios.request({
            url:`/api/projects/course/${this.props.course}?access_token=${access_token}`,
            method: 'get',
            baseURL: "http://"+config.ipAddress+":"+config.port+"/",
        })
            .then( response => {
                this.setState({
                   projects: response.data
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        if (this.state.projects.length === 0){
            return (
              <div>
                  There are no projects!
              </div>
            );
        }
        return (
            <div className="container">
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>{lang.USERNAME}</th>
                        <th>{lang.STUDENT_NAME}</th>
                        <th>{lang.TOPIC}</th>
                        <th>{lang.STATUS}</th>
                        <th>{lang.FILE}</th>
                        <th>{lang.ACTIONS}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.projects.map( (project) => (
                            <ProjectTableItem key={project.id} project={project}/>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ProjectTable;
