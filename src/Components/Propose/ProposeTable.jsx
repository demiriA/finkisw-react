import React, {Component} from "react";
import { Link } from 'react-router-dom';
import language from "../../Resources/lang";
import config from "../../Resources/Config";
import cookie from "react-cookies";
import axios from "axios";
import ProposeTableItem from "./ProposeTableItem";


class ProposeTable extends Component{

    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }
        return (
            <div className="container">
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>{lang.USERNAME}</th>
                        <th>{lang.STUDENT_NAME}</th>
                        <th>{lang.TOPIC}</th>
                        <th>{lang.STATUS}</th>
                        <th>{lang.ACTIONS}</th>
                    </tr>
                    </thead>
                    <tbody>
                      <ProposeTableItem />
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ProposeTable;
