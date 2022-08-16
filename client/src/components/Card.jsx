import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ flag_img, name, continent, id}){
    return (
        <Link className="link" to={`/details/${id}`}>
            <div className="card">
                <div>
                    <img className="image" src={flag_img} alt="Img Not Found" width="100px" height="50px"/>
                    <h3>{name}</h3>
                    <h5>Continent: {continent}</h5>
                </div>
            </div>
        </Link>
    )
};