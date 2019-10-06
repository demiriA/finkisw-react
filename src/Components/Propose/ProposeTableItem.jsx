import React, {Component} from "react";
import { Link } from 'react-router-dom';
import language from "../../Resources/lang";

class ProposeTableItem extends Component{
    render() {
        let lang = language.en;
        if(localStorage.getItem("lang") === "mk"){
            lang = language.mk;
        }

        return (
            <tr>
                <td>1</td>
                <td>163055</td>
                <td>Albin Baftijarovski</td>
                <td>Topic name proposed from student</td>
                <td className="text-primary"><i className="far fa-check-circle"> </i> {lang.NOT_REVIEWED}</td>
                <td>
                    <Link to="/courses" className="btn btn-sm btn-primary m-1">{lang.PREVIEW}</Link>
                </td>
            </tr>
        );
    }
}
export default ProposeTableItem;
