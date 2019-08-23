import React, {Component} from "react";
import { Link } from 'react-router-dom';

class HomeworksTableItem extends Component{
    render() {
        return (
            <tr>
                <td>1</td>
                <td>Homework 1</td>
                <td>Course 1</td>
                <td>Teacher One</td>
                <td>15 Aug, 23:55</td>
                <td>31 Aug, 23:59</td>
                <td>
                    <Link to="/homeworks" className="btn btn-sm btn-danger m-1">Delete</Link>
                    <Link to={"/homeworks/edit/1"} className="btn btn-sm btn-success m-1">Edit</Link>
                </td>
            </tr>
        );
    }
}
export default HomeworksTableItem;
