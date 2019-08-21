import React, {Component} from 'react';
import {Link} from "react-router-dom";
import MyHomeworks from "../Homeworks/MyHomeworks";

class CoursePreview extends Component {

    render() {
        return(
          <div className="sw-course">
              <h1>
                  <i className="fas fa-angle-double-right"/>
                  <Link to={"/course/"} className="course-link-prev"> Course 1</Link>
              </h1><hr/>
              <ul className="nav nav-tabs nav-justified">
                  <li className="nav-item">
                      <a className="nav-link active" href="#homeworks" data-toggle="tab">Seminar work</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#info" data-toggle="tab">Info</a>
                  </li>
              </ul>
              <div className="tab-content">
                  <div className="tab-pane active" id="homeworks">
                      <MyHomeworks/>
                  </div>
                  <div className="tab-pane" id="info">
                        <p>Course info and teacher name!</p>
                  </div>
              </div>
          </div>
        );
    }
}

export default CoursePreview;