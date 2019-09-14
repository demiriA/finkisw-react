import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import cookie from "react-cookies";
import axios from "axios";
<<<<<<< HEAD
import auth from '../../Auth/Auth';
=======
>>>>>>> 16c68824c88e72bfc3df4969102f630a1af6ad32

class Navbar extends Component{
  constructor(){
    super();
    this.state = {
      user: '',
      roles: '',
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

  componentDidMount(){
    if(cookie.load("USER_SESSION") !== undefined){
      this.userDetails();
    }
  }

  userDetails(){
    let access_token = cookie.load("USER_SESSION");
    axios.request({
      url:`/api/current?access_token=${access_token}`,
      method: 'get',
      baseURL: "http://localhost:3001/",
    })
        .then( response => {
          this.setState({
            user: response.data,
            roles: response.data.roles[0]
          })
        });
    this.props.history.push("/");
  }

  onLogout(){
    cookie.remove('USER_SESSION');
    this.props.history.push("/login");
  }

  render(){
    if(window.location.pathname.match("/login")){
      return null;
    }
    const roleName = this.state.roles.roleName;
    const user = this.state.user;

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
                  <i className="fas fa-th"/> {
                  roleName === "ADMIN_USER" ? "Actions" : (roleName === "TEACHER_USER" ? "Homeworks" : "Courses")
                }
                </Link>
                <div className="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                  {
                    roleName === "ADMIN_USER" ? (
                            <React.Fragment>
                            <Link className="dropdown-item" to="/users"><i className="fas fa-angle-right"/> Users</Link>
                              <Link className="dropdown-item" to="/courses"><i className="fas fa-angle-right"/> Courses</Link>
                            </React.Fragment>
                    ) :
                        roleName === "TEACHER_USER" ?
                        (
                            <Link className="dropdown-item" to="/homeworks"><i className="fas fa-angle-right"/> Homeworks</Link>
                        )
                            :
                            (
                                this.state.courses.map(
                                    (course) =>
                                        <Link key={course.id} className="dropdown-item" to={"/course/"+course.id}><i className="fas fa-angle-right"/> {course.name}</Link>
                                )
                            )
                  }
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link to={"#"} className="nav-link dropdown-toggle text-light" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-user"/> {user.firstName+" "+user.lastName}
                </Link>
                <div className="dropdown-menu dropdown-menu-right dropdown-default"
                     aria-labelledby="navbarDropdownMenuLink-333">
                  <Link className="dropdown-item" to="/settings"><i className="fas fa-eye"/> {roleName}</Link>
                  <Link className="dropdown-item" to="#" onClick={this.onLogout.bind(this)}><i className="fas fa-sign-out-alt"/> Sign out</Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
}
export default withRouter(Navbar);
