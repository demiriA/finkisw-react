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
                },
                {
                    id: 2,
                    name: "Homework 2",
                    course: "Course 1",
                    expire: "23 Sep, 23:59",
                    posted: "31 Aug, 23:55",
                    teacher: "Teacher Two",
                    instruction: "Homework 2 description text how to prepare and so on..."
                }
            ]
        }
    }

    componentWillMount() {
        console.log(this.state.homeworks);
    }

    render() {
        return(
          <div>
              {
                  this.state.homeworks.map(
                      (homework) =>
                          <MyHomeworksItem key={homework.id} homework={homework} status={false} />
                  )
              }
          </div>
        );
    }
}
export default MyHomeworks;