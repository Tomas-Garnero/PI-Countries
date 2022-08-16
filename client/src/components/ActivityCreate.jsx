import React from "react";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
// import {useNavigate} from "react-router-dom";
import {postActivity, getCountries} from "../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import "./ActivityCreate.css";
import validate from "./validate.js";


export default function ActivityCreate(){
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const {countries} = useSelector((state) => {return state});
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    })

    function handleSeason(e){
        setInput({
            ...input,
            season: e.target.value
        })
    }

    function handleDifficulty(e){
        e.preventDefault();
        setInput({
            ...input,
            difficulty: e.target.value
        })
    }

    function handleDuration(e){
        setInput({
            ...input,
            duration: e.target.value
        })
    }

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCountry(e){
        e.preventDefault();
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }


    useEffect(() => {
        dispatch(postActivity())
        dispatch(getCountries())
    }, [dispatch])

    
    function handleSubmit(e){
        e.preventDefault();

        if(!input.name) alert('Se necesita un nombre.')
        else if(!input.difficulty) alert('Debe seleccionar un nivel de dificultad.')
        else if(!input.duration) alert('Debe seleccionar una duración aproximada.')
        else if(!input.season) alert('Debe seleccionar una temporada.')
        else if(!input.countries) alert('Debe seleccionar al menos un país.')
        else {
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))

            dispatch(postActivity(input));
            alert('Actividad Creada!')
            setInput({
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                countries: []
            })
            // navigate("/home")
        }
    }


    function handleDelete(e){
        setInput({
            ...input,
            countries: input.countries.filter((c) => c !== e)
        })
    }


    return (
        <div className="createbg">
            <Link className="btncreate" to="/home"><button>Volver</button></Link>
            <form className="cntcreate" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="titlecreate">Crea tu Actividad Turística</h1>
                <div>
                    <label htmlFor="">Nombre:</label>
                    <input 
                    text="text" 
                    value={input.name} 
                    name="name" 
                    required
                    onChange={(e) => handleChange(e)}
                    className="inputname"
                    placeholder="Nombre de la act..."/>
                </div>

                <div>
                    <label>Dificultad:</label>
                    <select className="selectcreate" value={input.difficulty} onChange={(e) => handleDifficulty(e)}>
                        <option key='difficulty'>Dificultad...</option>
                        <option value={1} key={'1'}>1</option>
                        <option value={2} key={'2'}>2</option>
                        <option value={3} key={'3'}>3</option>
                        <option value={4} key={'4'}>4</option>
                        <option value={5} key={'5'}>5</option>
                    </select>
                </div>

                <div>
                    <label>Duración:</label>
                    <select className="selectcreate" value={input.duration} onChange={(e) => handleDuration(e)}>
                        <option key={'duration'}>Duration...</option>
                        <option value={'1hr'} key={'1hr'}>1hr</option>
                        <option value={'2hs'} key={'2hs'}>2hs</option>
                        <option value={'3hs'} key={'3hs'}>3hs</option>
                        <option value={'4hs'} key={'4hs'}>4hs</option>
                        <option value={'5hs'} key={'5hs'}>5hs</option>
                        <option value={'6hs'} key={'6hs'}>6hs</option>
                        <option value={'7hs'} key={'7hs'}>7hs</option>
                        <option value={'8hs'} key={'8hs'}>8hs</option>
                        <option value={'9hs'} key={'9hs'}>9hs</option>
                        <option value={'10hs'} key={'10hs'}>10hs</option>
                        <option value={'11hs'} key={'11hs'}>11hs</option>
                        <option value={'12hs'} key={'12hs'}>12hs</option>
                    </select>
                </div>

                <div>
                    <label>Temporada:</label>
                    <select className="selectcreate" value={input.season} onChange={(e) => handleSeason(e)}>
                        <option key={'season'}>Season...</option>
                        <option value={'Summer'} key={'Summer'}>Verano</option>
                        <option value={'Fall'} key={'Fall'}>Otoño</option>
                        <option value={'Winter'} key={'Winter'}>Invierno</option>
                        <option value={'Spring'} key={'Spring'}>Primavera</option> 
                    </select>
                </div>

                <div>
                    <label>Países:</label>
                    <select className="selectcreate" value={input.countries} onChange={(e) => handleCountry(e)}>
                        <option key={'Country'}>País...</option>
                        {countries.map((c) => (
                            <option value={c.id} key={c.id}>{c.name}</option>
                        ))}
                    </select>

                    {errors.name || !input.name || !input.countries ?
                    <button className="btncreate" type="submit" disable={true}>CREAR</button> :
                    <button className="btncreate" type="submit">CREAR</button>}
                    {errors.name && (<p>{errors.name}</p>)}

                    <div>
                        {
                            input.countries.map(e => 
                                <div className="cntdelete">
                                    <button className="btndelete" onClick={(e) => handleDelete(e)}>x</button>
                                    <p>{e}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}