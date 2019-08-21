import React, {Component} from "react";
import './Courses.css'
import MyCoursesItem from "./MyCoursesItem";
class MyCourses extends Component{
    constructor(){
        super();
        this.state = {
            courses:[
                {
                    id: 1,
                    name: "Course 1"
                },
                {
                    id: 2,
                    name: "Course 2"
                }
            ]
        }
    }

    componentWillMount() {
        console.log(this.state.courses);
    }


    render() {
        return (
            <React.Fragment>
                <h2><i className="fas fa-tasks"/> My Courses</h2>
                <hr/>
                <div className="row">
                    {
                        this.state.courses.map(
                            (course) =>
                                <MyCoursesItem key={course.id} course={course}/>
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}
export default MyCourses;
