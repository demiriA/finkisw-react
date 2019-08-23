import React, {Component} from "react";
import { Link } from 'react-router-dom';
import HomeworksTableItem from "./HomeworksTableItem";
import HomeworksEditForm from "./HomeworksEditForm";


class HomeworksTable extends Component{
    render() {
        return (
            <div className="container">
                <h3>Homeworks</h3>
                <Link to="/homeworks/create" className="btn btn-outline-primary mb-2">Create new</Link>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Homework name</td>
                        <td>Course name</td>
                        <td>Teacher name</td>
                        <td>Posted on</td>
                        <td>Due on</td>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <HomeworksTableItem/>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default HomeworksTable;
