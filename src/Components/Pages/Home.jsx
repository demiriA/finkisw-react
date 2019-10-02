import React from "react";
import MyCourses from "../Courses/MyCourses";
import Upcoming from "../Upcoming/Upcoming";
import auth from '../../Auth/Auth'

function Home() {
  if(!auth.isAuthenticated()){
    return null;
  }
    return (
        <React.Fragment>
            <Upcoming/>
            <MyCourses/>
        </React.Fragment>
    );
}
export default Home;
