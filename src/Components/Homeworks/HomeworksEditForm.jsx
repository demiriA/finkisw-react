import React, {Component} from "react";
import {Link} from "react-router-dom";

class HomeworksEditForm extends Component{

    render() {
        return (
            <div className="form-group col-md-6 m-auto">
                <h3>Edit Homework 1</h3>
                <form>
                    <input type="text" name="name" ref="name" placeholder="Name" className="form-control mb-2" value="Homework 1" />
                    <textarea className="form-control mb-2" rows="15" placeholder="Homework decsription and rules!" value="Homework 1 description text how to prepare and so on..."> </textarea>
                    <select className="form-control mb-2" name="course" ref="course" value="Course 2" disabled="disabled">
                        <option value="Course 1">Course 1</option>
                        <option value="Course 2">Course 2</option>
                        <option value="Course 3">Course 3</option>
                    </select>
                    <small>Subbmition due:</small>
                    <input type="datetime-local" value="2019-08-12T19:30" className="form-control mb-2"/>
                    <input type="text" name="teacher" ref="teacher" placeholder="Teacher" value="Teacher One" disabled="disabled" className="form-control mb-2" />
                    <input type="submit" value="Update" className="btn btn-outline-primary mb-2"/>
                </form>
                <p><Link to="/homeworks">Back to list</Link></p>
            </div>
        );
    }
}
export default HomeworksEditForm;
