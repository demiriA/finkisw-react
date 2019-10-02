import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Footer from "./Footer/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Help from "./Pages/Help";
import CoursePreview from "./Courses/CoursePreview";
import HomeworkPreview from "./Homeworks/HomeworkPreview";
import CourseTable from "./Courses/CourseTable";
import CourseAddForm from "./Courses/CourseAddForm";
import CourseEditForm from "./Courses/CourseEditForm";
import UsersTable from "./Users/UsersTable";
import UsersAddForm from "./Users/UsersAddForm";
import UsersEditForm from "./Users/UsersEditForm";
import HomeworksTable from "./Homeworks/HomeworksTable";
import HomeworksAddForm from "./Homeworks/HomeworksAddForm";
import HomeworksEditForm from "./Homeworks/HomeworksEditForm";
import UserSettingsForm from "./Users/UserSettingsForm";
import auth from '../Auth/Auth';
import CourseEditInfoForm from "./Courses/CourseEditInfoForm";

function ProtectedRoutes (props){

  if(!auth.isAuthenticated()){
    return null;
  }
  return(
      <React.Fragment>
        <div className="container-fluid bg-dark">
          <Navbar />
        </div>
        <div className="container">
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/help" component={Help}/>
              <Route path="/about" component={About}/>

              <Route path="/course/:id" component={CoursePreview}/>
              <Route exact path="/courses" component={CourseTable}/>
              <Route path="/courses/create" component={CourseAddForm}/>
              <Route path="/courses/edit/:id" component={CourseEditForm}/>
              <Route path="/courses/editInfo/:id" component={CourseEditInfoForm}/>

              <Route exact path="/settings" component={UserSettingsForm}/>
              <Route exact path="/users" component={UsersTable}/>
              <Route exact path="/users/create" component={UsersAddForm}/>
              <Route exact path="/users/edit/:id" component={UsersEditForm}/>

              <Route exact path="/homework/:id" component={HomeworkPreview}/>
              <Route exact path="/homeworks" component={HomeworksTable}/>
              <Route path="/homeworks/create" component={HomeworksAddForm}/>
              <Route path="/homeworks/edit/:id" component={HomeworksEditForm}/>
              <Route path="*" component={() => "404 NOT FOUND"}/>
            </Switch>
            <Footer/>
          </div>
      </React.Fragment>
  );
}

export default ProtectedRoutes;
