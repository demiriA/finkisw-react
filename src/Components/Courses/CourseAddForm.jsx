import React, {Component} from "react";
import { Link } from 'react-router-dom';

class CourseAddForm extends Component{

    constructor(props){
      super(props);
      this.state = {
        name: '',
        year: '',
        teachers: []
      }

      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    createCourse(course){
      console.log(course);
    }

    onSubmit(e){
      const course = {
        name: this.state.name,
        year: this.state.year,
        teachers: this.state.teachers
      }
      this.createCourse(course);
      e.preventDefault();
    }

    onChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]:value
        });
        e.preventDefault();
    }

    render() {
        return (
            <div className="form-group col-md-6 m-auto">
                <h3>Create a course</h3>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" ref="name" placeholder="Name" className="form-control mb-2" value={this.state.name} onChange={this.onChange} />
                    <input type="text" name="year" ref="year" placeholder="Year" className="form-control mb-2" value={this.state.year} onChange={this.onChange} />
                    <select multiple className="form-control mb-2" name="teachers" ref="teachers" value={this.state.teachers} onChange={this.onChange}>
                        <option value="Teacher One">Teacher One</option>
                        <option value="Teacher One">Teacher Two</option>
                    </select>
                    <input type="submit" value="Create" className="btn btn-outline-primary mb-2"/>
                </form>
                <p><Link to="/courses">Back to list</Link></p>
            </div>
        );
    }
}
export default CourseAddForm;
