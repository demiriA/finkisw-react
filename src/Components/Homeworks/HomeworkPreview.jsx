import React, {Component} from 'react';

class HomeworkPreview extends Component {
    render() {
        return(
            <div className="card mt-5 p-3">
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Homework 1</h2>
                            <p>Homework 1 description text how to prepare and so on...</p>
                        </div>
                        <div className="col-md-6">
                            <p>Submition posted on: 15 Aug, 23:55</p>
                            <p>Submission due:  31 Aug, 23:59</p>
                            <p>Teacher: Teacher One</p>
                            <p>Status:
                                {
                                    false ? <font className="text-success"> Uploaded</font> : <font className="text-danger"> Not uploaded</font>
                                }
                            </p>
                        </div>
                    </div>
                    <input type="file" className="btn btn-dark btn-lg"/>
                </form>
            </div>
        );
    }
}
export  default HomeworkPreview;