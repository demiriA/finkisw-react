import React, {Component} from "react";
import { Link } from 'react-router-dom';

class CourseTableItem extends Component{
    render() {
        return (
            <tr>
                <td>1</td>
                <td>Course 1</td>
                <td>2017/2018</td>
                <td>Teacher One</td>
                <td>
                    <Link to="/courses" className="btn btn-sm btn-danger m-1" onClick={this.props.deleteCategory}>Delete</Link>
                    <Link to={"/courses/edit/1"} className="btn btn-sm btn-success m-1">Edit</Link>
                </td>
            </tr>
        );
    }
}
export default CourseTableItem;
