import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getDetails} from "../actions/index.js";
import "./CountryDetail.css";

export default function CountryDetail(props){
    const dispatch = useDispatch();

    const myCountry = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetails(props.match.params.id));
    }, [dispatch])

    return (
        <div className="detailbg">
            <Link to='/home'><button className="btndetail">Volver</button></Link>
            {
                myCountry?
                <div>
                    <div className="cldetail">
                        <h1>{myCountry.name}</h1>
                        <img className="imgdetail" src={myCountry.flag_img} alt="not found"/>
                        <h3>Continent: {myCountry.continent}</h3>
                        <h3>Capital: {myCountry.capital}</h3>
                        <h4>Subregion: {myCountry.subregion}</h4>
                        <h4>Area: {myCountry.area} km2</h4>
                        <h4>Population: {myCountry.population}</h4>
                        <h3>Id: {myCountry.id}</h3>
                    </div>
                <div>
                    {
                        myCountry.activities?.map((e) =>{
                            return(
                                <div className="clactivity">
                                    <h5>Activities: {e.name}</h5>
                                    <h5>Difficulty: {e.difficulty}</h5>
                                    <h5>Duration: {e.duration}</h5>
                                    <h5>Season: {e.season}</h5>
                                </div>
                            )
                        })
                    }
                </div>
                </div>:
                <p>Loading...</p>
            }
        </div>
    )
}