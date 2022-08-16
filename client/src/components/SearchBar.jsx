import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";
import "./SearchBar.css";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [order, setOrder] = useState("");
    
    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if (name !== ""){
            dispatch(getNameCountries(name));
            setName("");
            setOrder(`Ordenado: ${e.target.value}`)
        } else {
            alert("Ingrese el nombre de un País")
        }
    }

    return (
        <div>
            <input
            className="inputsearch"
            type="text"
            value={name}
            placeholder="Encuentra un País..." 
            onChange={(e) => handleInputChange(e)}
            />
            <button className="btnsearch" type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}