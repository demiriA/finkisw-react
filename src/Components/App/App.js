import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Help from "../Pages/Help";
import CoursePreview from "../Courses/CoursePreview";
import HomeworkPreview from "../Homeworks/HomeworkPreview";
import CourseTable from "../Courses/CourseTable";
import CourseAddForm from "../Courses/CourseAddForm";
import CourseEditForm from "../Courses/CourseEditForm";
import UsersTable from "../Users/UsersTable";
import UsersAddForm from "../Users/UsersAddForm";
import UsersEditForm from "../Users/UsersEditForm";
import HomeworksTable from "../Homeworks/HomeworksTable";
import HomeworksAddForm from "../Homeworks/HomeworksAddForm";
import HomeworksEditForm from "../Homeworks/HomeworksEditForm";

class App extends Component{

    constructor(props){
        super(props);
        this.state={
            loggStatus: "LOGGED_IN"
        }
    }

    componentDidMount() {
        this.checkLoggStatus();
    }
    checkLoggStatus(){
        if (this.state.loggStatus === "NOT_LOGGED_IN"){
            window.location.href = 'http://localhost:8080/login'
        }
    }


    render() {
        return (
            <Router>
                <div className="container-fluid bg-dark">
                    <Navbar />
                </div>
                <div className="container">
                    <Route exact path="/" component={Home}/>
                    <Route path="/help" component={Help}/>
                    <Route path="/about" component={About}/>

                    <Route path="/course/:id" component={CoursePreview}/>
                    <Route exact path="/courses" component={CourseTable}/>
                    <Route path="/courses/create" component={CourseAddForm}/>
                    <Route path="/courses/edit/:id" component={CourseEditForm}/>

                    <Route exact path="/users" component={UsersTable}/>
                    <Route exact path="/users/create" component={UsersAddForm}/>
                    <Route exact path="/users/edit/:id" component={UsersEditForm}/>

                    <Route exacct path="/homework/:id" component={HomeworkPreview}/>
                    <Route exact path="/homeworks" component={HomeworksTable}/>
                    <Route path="/homeworks/create" component={HomeworksAddForm}/>
                    <Route path="/homeworks/edit/:id" component={HomeworksEditForm}/>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
