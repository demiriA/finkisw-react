import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UpcomingItem extends Component{
    render() {
        const {id, name, course, expire} = this.props.homework;
        return(
           <React.Fragment>
               <div className="col-md-9">
                   <Link to={"/homework/"+id} className="course-link" >{name}</Link><br/>
                   <small>{course}</small>
               </div>
               <div className="col-md-3">
                   <p className="course-link">{expire}</p>
               </div>
           </React.Fragment>
        );
    }
}

export default UpcomingItem;