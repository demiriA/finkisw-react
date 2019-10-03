import React, {Component} from 'react';
import {Link} from "react-router-dom";
import language from "../../Resources/lang";

class MyHomeworksItem extends Component{
    render() {

        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        const { name, expire, posted, teacher, instruction } = this.props.homework;

        return(
            <div className="card mt-5 p-3">
                <div className="row">
                    <div className="col-md-6">
                        <h2>{name}</h2>
                        <p>{instruction}</p>
                    </div>
                    <div className="col-md-6">
                        <p>Submition posted on: {posted}</p>
                        <p>Submission due: {expire}</p>
                        <p>Teacher: {teacher}</p>
                        <p>Status:
                            {
                                this.props.status ? <font className="text-success"> Uploaded</font> : <font className="text-danger"> Not uploaded</font>
                            }
                        </p>
                    </div>
                </div>
                <Link className="btn btn-dark btn-lg" to="/homework/1">{lang.APPLY}</Link>
            </div>
        );
    }
}
export default MyHomeworksItem;