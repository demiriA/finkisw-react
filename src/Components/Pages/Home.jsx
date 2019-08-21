import React from "react";
import MyCourses from "../Courses/MyCourses";
import Upcoming from "../Upcoming/Upcoming";

function Home() {
    return (
        <React.Fragment>
            <Upcoming/>
            <MyCourses/>
        </React.Fragment>
    );
}
export default Home;