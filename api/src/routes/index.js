const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const country = require("./country.js");
const activity = require("./activity.js");

// const axios = require("axios");
// const {Country, Activity} = require("../db.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", country);
router.use("/activities", activity);

module.exports = router;

//------------------------------------------------------------------------------------------------------------

// let apiAll = "https://restcountries.com/v3/all";

// // funcion con la cual me traigo la info de la API
// const getApiInfo = async () => {
//     const apiUrl = await axios.get(apiAll);
//     const apiInfo = await apiUrl.data.map(e => {
//         return {
//             id: e.cioc ? e.cioc : e.cca3,
//             name: e.name.common,
//             flag_img: e.flags[0],
//             continent: e.continents ? e.continents[0] : "Continent Not Found",
//             capital: Array.isArray(e.capital) ? e.capital[0] : e.capital, 
//             subregion: e.subregion,
//             area: e.area,
//             population: e.population
//         };
//     });
//     return apiInfo;
// };

// // funcion con la cual me traigo la info de la Data base
// const getDbInfo = async () => {
//     // Traeme todos los countries
//     return await Country.findAll({
//         // Incluime el modelo activity
//         include: {
//             model: Activity,
//             // Y de este modelo activity traeme los siguientes atributos
//             attributes: ["name", "difficulty", "duration", "season"], // Noc si hace falta traer ID
//             // Mediante los atributos
//             through: {
//                 attributes: []
//             },
//         }
//     })
// };

// // funcion con la cual concateno la info de ambas funciones
// const getAllCountries = async () => {
//     const apiInfo = await getApiInfo();
//     const dbInfo = await getDbInfo();
//     const infoTotal = apiInfo.concat(dbInfo);
//     return infoTotal;
// }

// router.get("/countries", async (req, res) => {
//     try {
//         await Country.findOrCreate()
//     } catch(e) {

//     }
// });

// router.get("/countries", async (req, res) => {

//     let result = {sucesses: false, message: ""};

//     try {
//         let data = await axios.get(apiAll).then(response => response.data);
//         let data_format = data.map(e => (
//             {
//                 id: e.cioc ? e.cioc : e.cca3,
//                 name: e.name.common,
//                 flag_img: e.flags[0],
//                 continent: e.continents ? e.continents[0] : "Continent Not Found",
//                 capital: Array.isArray(e.capital) ? e.capital[0] : e.capital,
//                 subregion: e.subregion,
//                 area: e.area,
//                 population: e.population
//             }
//         ));

//         await Country.bulkCreate(data_format);

//         result.sucesses = true;
//         result.message = "Paises agregados correctamente"
//         res.status(200).json(result);
//     } catch(e) {
//         res.status(400).json({error: result});
//     }
// });










