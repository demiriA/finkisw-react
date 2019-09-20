import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import cookie from "react-cookies";
import axios from "axios";
import auth from '../../Auth/Auth';
import language from '../../Resources/lang';
import config from '../../Resources/Config';
class Navbar extends Component{
  constructor(){
    super();
    this.state = {
      user: '',
      role: '',
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
    };
  }

  componentDidMount(){
    this.userDetails();
  }

  userDetails(){
    let access_token = cookie.load("USER_SESSION");
    axios.request({
      url:`/api/current?access_token=${access_token}`,
      method: 'get',
      baseURL: "http://"+config.ipAddress+":"+config.port+"/",
    })
        .then( response => {
          this.setState({
            user: response.data,
            role: response.data.roles[0]
          })
        });
  }

  onLogout(){
    auth.logout(() => {
      cookie.remove('USER_SESSION');
      this.props.history.push("/login");
    })
  }

  setLanguage(lang){
    localStorage.setItem("lang",lang);
  };

  render(){
    const roleName = this.state.role.roleName;
    const user = this.state.user;
    let lang = language.en;
    if(localStorage.getItem("lang") === "mk"){
       lang = language.mk;
    }

    if(!auth.isAuthenticated()){
      return null;
    }
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
                <Link className="nav-link text-light" to="/help"><i className="fas fa-question"/> {lang.HELP}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/about"><i className="fas fa-magic"/> {lang.ABOUT}</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item dropdown">
                <Link to={"#"} className="nav-link dropdown-toggle text-light" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-flag"/> {lang.LANGUAGE}
                </Link>
                <div className="dropdown-menu dropdown-menu-right dropdown-default"
                     aria-labelledby="navbarDropdownMenuLink-333">
                  <Link className="dropdown-item" to="#" onClick={() => this.setLanguage("en")}>English</Link>
                  <Link className="dropdown-item" to="#" onClick={() => this.setLanguage("mk")}>Macedonian</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link to={"#"} className="nav-link dropdown-toggle text-light" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-th"/> {
                  roleName === "ADMIN_USER" ? <font>{lang.ACTIONS}</font> : (roleName === "TEACHER_USER" ? <font>{lang.HOMEWORK}</font> : <font>{lang.COURSES}</font>)
                }
                </Link>
                <div className="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                  {
                    roleName === "ADMIN_USER" ? (
                            <React.Fragment>
                            <Link className="dropdown-item" to="/users"><i className="fas fa-angle-right"/> {lang.USERS}</Link>
                              <Link className="dropdown-item" to="/courses"><i className="fas fa-angle-right"/> {lang.COURSES}</Link>
                            </React.Fragment>
                    ) :
                        roleName === "TEACHER_USER" ?
                        (
                            <Link className="dropdown-item" to="/homeworks"><i className="fas fa-angle-right"/> {lang.HOMEWORK}</Link>
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
                  <Link className="dropdown-item" to="/settings"><i className="fas fa-eye"/> {roleName === "ADMIN_USER" ? <font>{lang.ADMIN}</font> :
                      roleName === "TEACHER_USER" ? <font>{lang.TEACHER}</font> : <font>{lang.STUDENT}</font>}</Link>
                  <Link className="dropdown-item" to="#" onClick={this.onLogout.bind(this)}><i className="fas fa-sign-out-alt"/> {lang.SIGN_OUT}</Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
}
export default withRouter(Navbar);
