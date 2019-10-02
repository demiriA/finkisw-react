import React from "react";
import language from "../../Resources/lang";

function Help() {
    let lang = language.en;
    if(localStorage.getItem("lang") === "mk"){
        lang = language.mk;
    }
    return (
        <div className="sw-help">
            <h1>{lang.HELP}</h1>
            <p>Something about Finki Seminar Work System.</p>
        </div>
    );
}
export default Help;