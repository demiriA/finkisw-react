import React, {Component} from "react";
import {Link} from "react-router-dom";

class CourseEditForm extends Component{

    render() {
        return (
            <div className="form-group col-md-6 m-auto">
                <h3>Edit Course 1</h3>
                <form>
                    <input type="text" name="name" ref="name" placeholder="Name" className="form-control mb-2" value={"Course 1"}/>
                    <input type="text" name="year" ref="year" placeholder="Year" className="form-control mb-2" value={"2017/2018"}/>
                    <select className="form-control mb-2" name="teacher" ref="teacher" value="Teacher Two">
                        <option value="Teacher One">Teacher One</option>
                        <option value="Teacher One">Teacher Two</option>
                    </select>
                    <input type="submit" value="Update" className="btn btn-outline-primary mb-2"/>
                </form>
                <p><Link to="/courses">Back to list</Link></p>
            </div>
        );
    }
}
export default CourseEditForm;
