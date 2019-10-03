import React, {Component} from "react";
import language from "../../Resources/lang";

class DashItem extends Component{
        render() {
            let lang = language.en;
            if(localStorage.getItem("lang") === "mk"){
                lang = language.mk;
            }
        return(
            <div className="card mb-3">
                <div className="card-header"><h3>{this.props.title}</h3> <small>{lang.TOTAL} {this.props.total}</small></div>
                <div className="card-body">
                    <ul className="list-group">
                        {

                            this.props.data.map( (teacher) => (
                                <li className="list-group-item" key={teacher.id}> {
                                    this.props.positive ? (
                                        <button onClick={() => this.props.onAdd(teacher.id)} className="btn btn-success btn-sm">Add</button>
                                    ) : (
                                        <button onClick={() => this.props.onRemove(teacher.id)} className="btn btn-danger btn-sm">Remove</button>
                                    )
                                } <b>{teacher.username}</b> - {teacher.firstName} {teacher.lastName}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
export default DashItem;