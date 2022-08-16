import React from "react"
import SearchBar from "./SearchBar"
import {Link} from "react-router-dom";
import "./Header.css";

export default function Header() {

    return (
        <div className="header">
            <Link to={"/activities"} className="linkheader">CREAR ACTIVIDAD</Link>
            <SearchBar/>
        </div>
    )
}