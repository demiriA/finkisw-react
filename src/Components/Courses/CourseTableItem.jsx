import React, {Component} from "react";
import { Link } from 'react-router-dom';
import language from "../../Resources/lang";

class CourseTableItem extends Component{
    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        const {id, name, studyYear} = this.props.course;
        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{studyYear}</td>
                <td>
                    {
                        this.props.course.teachers.map((teacher) => (
                            <font key={teacher.id}>{teacher.firstName} {teacher.lastName}, </font>
                        ))
                    }
                </td>
                {
                    this.props.role === "TEACHER_USER" ?
                        (
                            <td width="16%">
                                <Link to={"/courses/editInfo/"+id} className="btn btn-sm btn-primary m-1">{lang.EDIT_INFO}</Link>
                            </td>
                        ) :
                        (
                        <td width="16%">
                            <Link to="/courses" className="btn btn-sm btn-danger m-1" onClick={this.props.onDelete}>{lang.DELETE}</Link>
                            <Link to={"/courses/edit/"+id} className="btn btn-sm btn-success m-1">{lang.EDIT}</Link>
                            <Link to={"/courses/editTeachers/"+id} className="btn btn-sm btn-primary m-1">{lang.EDIT_TEACHERS}</Link>
                            <Link to={"/courses/editStudents/"+id} className="btn btn-sm btn-primary m-1">{lang.EDIT_STUDENTS}</Link>
                        </td>
                        )
                }
            </tr>
        );
    }
}
export default CourseTableItem;
