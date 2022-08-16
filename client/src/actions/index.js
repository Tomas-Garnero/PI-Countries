import axios from "axios";

export function getCountries(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/countries", {});
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data
        });
    }
};

export function getNameCountries(name){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: "GET_NAME_COUNTRIES",
                payload: json.data
            });
        } catch(error){
            alert (`El País no se encontro... ${error}`);
        }
    }
};

export function getDetails(id){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/countries/${id}`);
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch(error){
            console.log(error);
        }
    }
};

export function getActivities(){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/activities/all");
            return dispatch({
                type: "GET_ACTIVITIES",
                payload: json.data
            })
        } catch(error){
            console.log(error);
        }
    }
};

export function postActivity(payload){
    return async function(dispatch){
        try {
            var json = await axios.post("/http://localhost:3001/activities", payload);
            return dispatch({
                type: "POST_ACTIVITY",
                payload: json.data
            })
        } catch(error){
            console.log(error);
        }
    }
};

export function filterByActivity(payload){
    return {
        type: "FILTER_ACTIVITY",
        payload
    }
}

export function filterByContinent(payload){
    return {
    type: "FILTER_BY_CONTINENT",
    payload
    }
};

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
};

export function orderByPopulation(payload){
    return {
        type: "ORDER_BY_POPULATION",
        payload
    }
};



