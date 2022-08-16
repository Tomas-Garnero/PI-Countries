import React from "react";
import { useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { 
    getCountries, 
    getActivities, 
    filterByContinent, 
    orderByName, 
    orderByPopulation, 
    filterByActivity 
    } from "../actions";
import {Link} from "react-router-dom";
import Card from "./Card.jsx";
import Paginado from "./Paginado.jsx";
import NavBar from "./NavBar.jsx";
import Header from "./Header.jsx";
import "./Home.css"
// import SearchBar from "./SearchBar.jsx";


export default function Home (){
    const dispatch = useDispatch();

    const allCountries = useSelector((state) => state.countries)
    // const allActivities = useSelector((state) => state.activities)

    // este estado local sirve para q se renderize el ordenamiento
    const [order , setOrder] = useState("");

    // declaro un estado local, en donde declaro la pagina actual y cual va a ser la pagina actual. Y que la pagina actual comienze en 1
    const [currentPage, setCurrentPage] = useState(1);
    // declaro otro estado local en donde tengo la acntidad de paises por pagina y el set. Ademas arranco en 10
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    // declaro que el indice del ultimo pais va a ser igual a la pagina actual multiplicado por los paises por paginas
    const indexOfLastCountry = currentPage * countriesPerPage;  
    // declaro que el indice del primer pais va a ser igual a el indice del ultimo pais menos los paises por pagina
    const indexOfFirstCoutry = indexOfLastCountry - countriesPerPage 
    // guardo en la variable declarada una porcion del array total de personaes, la cual va a ir desde el indice del primer pais hasta el indice del ultimo pais sin incluirlo
    const currentCountries = allCountries.slice(indexOfFirstCoutry, indexOfLastCountry)  // slice divide un array segun lo que le pase por parametro

    // el paginado setea la pagina en la que yo este y de ahi se modifica lo de arriba
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch])

    // function handleClick(e){
    //     e.preventDefault();
    //     dispatch(getCountries());
    // }

    function handleFilterContinent(e){
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
    }

    function handleSortName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleSortPopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleSortActivity(e){
        e.preventDefault();
        dispatch(filterByActivity(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }


    return (
        <div className="home">
            <Header/>
            <div>
                <div className="navbar"></div>
                <div className="navbar">
                    <NavBar
                    byName={handleSortName}
                    byPopulation={handleSortPopulation}
                    byContinent={handleFilterContinent}
                    byActivities={handleSortActivity}
                    />
                </div>

                <div className="navbar">
                    <Paginado
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    paginado={paginado}
                    />
                </div>

                {currentCountries?.map((e) => {
                    return (
                        <div className="container">
                            <Card
                            flag_img={e.flag_img}
                            name={e.name}
                            continent={e.continent}
                            id={e.id}
                            key={e.id}
                            />
                        </div>
                    );
                    })}
            </div>
        </div>
    )


    // return (
    //     <div>
    //         <Link to="/activities">Crea tu actividad turística!</Link>
    //         <h1>PAISES DEL MUNDO.. DESCRUBRE TU SIGUIENTE DESTINO</h1>
    //         <button onClick={e => {handleClick(e)}}>
    //             Volver a cargar todos los países
    //         </button>
    //         <div>
    //             <h2>Ordena Alfabéticamente</h2>
    //             <select onChange={e => handleSortName(e)}>
    //                 <option value="">Seleccione</option>
    //                 <option value="Asc">A a la Z</option>
    //                 <option value="Desc">Z a la A</option>
    //             </select>
    //             <h2>Ordena por Habitantes</h2>
    //             <select onChange={e => handleSortPopulation(e)}>
    //                 <option value="">Seleccione</option>
    //                 <option value="Asc">Menor a Mayor</option>
    //                 <option value="Desc">Mayor a Menor</option>
    //             </select>
    //             <h2>Filtra por Continentes</h2>
    //             <select onChange={e => handleFilterContinent(e)}>
    //                 {/* el valor del select es lo q de repente va a ser el e.target.value y va a llegar a la ccion por payload */}
    //                 <option value="All">Selecione</option>
    //                 <option value="Africa">Africa</option>
    //                 <option value="North America">Norteamérica</option>
    //                 <option value="South America">Sudamérica</option>
    //                 <option value="Asia">Asia</option>
    //                 <option value="Europe">Europa</option>
    //                 <option value="Oceania">Oceania</option>
    //                 <option value="Antarctica">Antártida</option>
    //             </select>
    //             <h2>Busca por Actividad</h2>
    //             <select onChange={e => handleSortActivity(e)}>
    //                 <option value="All">Todos</option>
    //                 {
    //                     allActivities?.map((e) => {
    //                         return (
    //                                 <option value={e.name} key={e.id}>{e.name}</option>
    //                         )
    //                     })
    //                 }
    //             </select>
    //             <div>
    //                 <Paginado 
    //                     countriesPerPage={countriesPerPage} 
    //                     allCountries={allCountries.length}
    //                     paginado={paginado}
    //                 />
    //                 <SearchBar/>
    //             </div>
    //             <div>
    //                 {currentCountries?.map((e) => {
    //                     return (
    //                         // fragment es como un div pero no toma espacio de la pagina
    //                         <Fragment>  
    //                                 <Card flag_img={e.flag_img} name={e.name} continent={e.continent} id={e.id} key={e.id}/>
    //                         </Fragment>
    //                     );
    //                 })}
    //             </div>
    //         </div>    
    //     </div>
    // )
} 