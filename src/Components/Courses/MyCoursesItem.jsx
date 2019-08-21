import React, {Component} from "react";
import {Link} from 'react-router-dom';
import './Courses.css'
class MyCoursesItem extends Component{
    render() {
        const {id, name} = this.props.course;
        return (
            <div className="col-md-6">
                <h2>
                    <i className="fas fa-angle-double-right"/>
                    <Link to={"/course/"+id} className="course-link"> {name}</Link>
                </h2>
            </div>
        );
    }
}
export default MyCoursesItem;
