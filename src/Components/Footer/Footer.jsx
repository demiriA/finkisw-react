import React from "react";
import {withRouter} from "react-router-dom";

function Footer() {
    if(window.location.pathname.match("/login")){
        return null;
    }
    return (
        <footer>
            <hr />
            <p>&copy; CSE 2019 - <a href="https://github.com/demiriA/finkisw-react" rel="noopener noreferrer" target="_blank">GITHUB </a>
                <a href="https://github.com/demiriA/finkisw-react" rel="noopener noreferrer" target="_blank">API</a>
            </p>
        </footer>
    );
}

export default withRouter(Footer);