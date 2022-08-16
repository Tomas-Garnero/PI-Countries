import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage(){
    return(
        <div className="main">
            <section className="showcase">
            <div>
                <Link to="/home">
                <button className="button">Ingresar</button>
                </Link>
            </div>
        </section>
        </div>
        
    )
};