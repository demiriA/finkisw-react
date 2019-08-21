import React, {Component} from 'react';
import UpcomingItem from "./UpcomingItem";

class Upcoming extends Component{
    constructor(){
        super();
        this.state = {
            homeworks:[
                {
                    id: 1,
                    name: "Homework 1",
                    course: "Course 2",
                    expire: "31 Aug, 23:59"
                },
                {
                    id: 2,
                    name: "Homework 2",
                    course: "Course 1",
                    expire: "23 Sep, 23:59"
                }
            ]
        }
    }

    componentWillMount() {
        console.log(this.state.homeworks);
    }
    render() {
        return(
          <div className="alert alert-secondary">
              <h2><i className="fas fa-file-upload"/> Upcoming uploads</h2>
              <hr/>
              <div className="row">
                  {
                      this.state.homeworks.map(
                          (homework) =>
                              <UpcomingItem key={homework.id} homework={homework} />
                      )
                  }
              </div>
          </div>
        );
    }
}

export default Upcoming;