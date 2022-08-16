
const initialState = {
    countries: [],
    allCountries: [],
    detail: {},
    activities: []      
}

function rootReducer (state = initialState, action){
    switch(action.type) {
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            };

        case "GET_NAME_COUNTRIES":
            const country = [...action.payload];
            return {
                ...state,
                countries: country
            };

        case "GET_DETAILS":
            return {
                ...state,
                detail: action.payload
            };

        case "GET_ACTIVITIES":
            return {
                ...state,
                activities: action.payload
            };

        case "POST_ACTIVITY":
            return {
                ...state,
                activities: [...state.activities, action.payload]
            };

        case "FILTER_BY_CONTINENT":
            const allCountries = state.allCountries;
            const continentFiltered = action.payload === "All" ? 
                allCountries : allCountries.filter(e => e.continent === action.payload);
            return{
                ...state,
                countries: continentFiltered
            };

        case "ORDER_BY_NAME":
            const countriesName = [...state.allCountries]
            const sortedByName = action.payload === "Asc" ?
            countriesName.sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        return 0;
                    }) : action.payload === "Desc" ?
                    countriesName.sort((a, b) => {
                        if (a.name < b.name) return 1;
                        if (a.name > b.name) return -1;
                        return 0;
                    }) : countriesName;
            return {
                ...state,
                countries: sortedByName
            };

        case "ORDER_BY_POPULATION":
            const countriesPopulation = [...state.allCountries]
            const sortedByPopulation = action.payload === "Asc" ?
                countriesPopulation.sort((a, b) => a.population - b.population) :
                action.payload === "Desc" ?
                countriesPopulation.sort((a, b) => b.population - a.population) :
                countriesPopulation
            return {
                ...state,
                countries: sortedByPopulation
            };
        
        case "FILTER_ACTIVITY":
            const allActivities = state.allCountries;
            const activityFiltered = action.payload === "All" ? 
                allActivities : allActivities.filter(c => c.Activities.some((a) => a.name === action.payload));
            return{
                ...state,
                countries: activityFiltered
            };

        default: 
            return state;
    }
}

export default rootReducer;