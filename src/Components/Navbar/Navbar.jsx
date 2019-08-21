import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component{
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

  render(){
    return (
        <nav className="container mb-1 navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <Link to="/" className="navbar-brand" href="#">FINKI SW</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
                  aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/help"><i className="fas fa-question"/> Help</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/about"><i className="fas fa-magic"/> About</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item dropdown">
                <Link to={"#"} className="nav-link dropdown-toggle text-light" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-th"/> Courses
                </Link>
                <div className="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                  {
                    this.state.courses.map(
                        (course) =>
                            <Link key={course.id} className="dropdown-item" to={"/course/"+course.id}><i className="fas fa-angle-right"/> {course.name}</Link>
                    )
                  }
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link to={"#"} className="nav-link dropdown-toggle text-light" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-user"/> Username
                </Link>
                <div className="dropdown-menu dropdown-menu-right dropdown-default"
                     aria-labelledby="navbarDropdownMenuLink-333">
                  <Link className="dropdown-item" to="#"><i className="fas fa-eye"/> Role</Link>
                  <Link className="dropdown-item" to="#"><i className="fas fa-sign-out-alt"/> Sign out</Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
}
export default Navbar;
