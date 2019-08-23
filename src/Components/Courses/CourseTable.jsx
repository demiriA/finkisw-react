import React, {Component} from "react";
import { Link } from 'react-router-dom';
import CourseTableItem from "./CourseTableItem";


class CourseTable extends Component{
    render() {
        return (
            <div className="container">
                <h3>Courses</h3>
                <Link to="/courses/create" className="btn btn-outline-primary mb-2">Create new</Link>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Course name</th>
                        <th>Study year</th>
                        <th>Teacher name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <CourseTableItem/>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default CourseTable;
