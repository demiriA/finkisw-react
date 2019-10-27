import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UpcomingItem extends Component{
    render() {
        const {id, name, course, editedDate, status} = this.props.project;
        let statClass = "primary";
        if (status === "Accepted"){
            statClass = "success";
        } else if (status === "Rejected"){
            statClass = "danger";
        }
        return(
           <React.Fragment>
               <div className="row">
                   <div className="col-md-9">
                       <Link to={"/project/preview/"+id} className="course-link" >{name}</Link><br/>
                       <Link to={"/course/"+course.id} ><small>{course.name}</small></Link>
                   </div>
                   <div className="col-md-3">
                       <p className={"text-"+statClass}>{status}</p>
                       <p className="course-link">{editedDate}</p>
                   </div>
               </div>
               <hr />
           </React.Fragment>
        );
    }
}

export default UpcomingItem;