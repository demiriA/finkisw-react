import React, {Component} from 'react';
import MyHomeworksItem from "./MyHomeworksItem";

class MyHomeworks extends Component{

    constructor(){
        super();
        this.state = {
            homeworks:[
                {
                    id: 1,
                    name: "Homework 1",
                    course: "Course One",
                    expire: "31 Aug, 23:59",
                    posted: "15 Aug, 23:55",
                    teacher: "Teacher One",
                    instruction: "Homework 1 description text how to prepare and so on..."
                }
            ]
        }
    }

    render() {
        return(
          <div>
              {
                  this.state.homeworks.map(
                      (homework) =>
                          <MyHomeworksItem key={homework.id} homework={homework} status={true} />
                  )
              }
          </div>
        );
    }
}
export default MyHomeworks;