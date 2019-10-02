import React from "react";
import language from "../../Resources/lang";

function About() {
    let lang = language.en;
    if(localStorage.getItem("lang") === "mk"){
        lang = language.mk;
    }
    return (
        <div className="sw-about">
            <h1>{lang.ABOUT}</h1>
            <p>Something about Finki Seminar Work System.</p>
        </div>
    );
}
export default About;