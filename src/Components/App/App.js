import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Help from "../Pages/Help";
import CoursePreview from "../Courses/CoursePreview";
import HomeworkPreview from "../Homeworks/HomeworkPreview";

function App() {
  return (
      <Router>
          <div className="container-fluid bg-dark">
              <Navbar />
          </div>
          <div className="container">
              <Route exact path="/" component={Home}/>
              <Route path="/help" component={Help}/>
              <Route path="/about" component={About}/>
              <Route path="/course" component={CoursePreview}/>
              <Route path="/homework" component={HomeworkPreview}/>
              <Footer/>
          </div>
      </Router>

  );
}

export default App;
