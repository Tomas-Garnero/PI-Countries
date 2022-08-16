import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities } from "../actions/index.js";
import "./NavBar.css";


export default function NavBar({byName, byPopulation, byContinent, byActivities}){
    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries())
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    const allActivities = useSelector((state) => state.activities);
        useEffect(()=>{
        dispatch(getActivities())
    }, [dispatch]);


    return (
        <div className="nav">
            <button className="reload" onClick={(e) => handleClick(e)}>Cargar países</button>
            <div className="clselect">
                <select className="select" onChange={(e) => byName(e)}>
                    <option value="">Seleccione</option>
                    <option value="Asc">A a la Z</option>
                    <option value="Desc">Z a la A</option>
                </select>

                <select className="select" onChange={(e) => byPopulation(e)}>
                    <option value="">Seleccione</option>
                    <option value="Asc">Menor a Mayor</option>
                    <option value="Desc">Mayor a Menor</option>
                </select>

                <select className="select" onChange={(e) => byContinent(e)}>
                    <option value="All">Selecione</option>
                    <option value="Africa">Africa</option>
                    <option value="North America">Norteamérica</option>
                    <option value="South America">Sudamérica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europa</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctica">Antártida</option>
                </select>

                <select className="select" onChange={(e) => byActivities(e)}>
                    <option value="All">Todas</option>
                    {allActivities?.map((e) => {return (<option value={e.name} key={e.id}>{e.name}</option>)})}
                </select>
            </div>
        </div>
    )
}





