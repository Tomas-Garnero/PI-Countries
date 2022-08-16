const { Router } = require('express');
const router = Router();
const axios = require("axios");
const { Country, Activity } = require('../db.js');

let apiAll = "https://restcountries.com/v3/all";

router.get("/", async (req, res) => {

    let country = await Country.findAll({
        attributes: ["id", "name", "flag_img", "continent", "population"],
        include: {
            // Incluime el modelo activity
            model: Activity,
            // Y de este modelo activity traeme los siguientes atributos
            attributes: ["id", "name", "difficulty", "duration", "season"],
            // Mediante los atributos
            through: {
                attributes: []
            },
        }
    });
    // console.log(country);
    if (!country.length) {
        try {
            let data = await axios.get(apiAll).then(response => response.data);
            let data_format = data.map(e => (
                {
                    id: e.cioc ? e.cioc : e.cca3,
                    name: e.name.common,
                    flag_img: e.flags[0],
                    continent: e.continents ? e.continents[0] : "Continent Not Found",
                    capital: Array.isArray(e.capital) ? e.capital[0] : e.capital,
                    subregion: e.subregion,
                    area: e.area,
                    population: e.population
                }
            ));

            await Country.bulkCreate(data_format);

            country = await Country.findAll({
                attributes: ["id", "name", "flag_img", "continent", "population"],
                include: {
                    // Incluime el modelo activity
                    model: Activity,
                    // Y de este modelo activity traeme los siguientes atributos
                    attributes: ["id", "name", "difficulty", "duration", "season"],
                    // Mediante los atributos
                    through: {
                        attributes: []
                    },
                }
            });
        } catch(e) {
            res.status(400).json({error: e});
        }
    };
    const name = req.query.name;
    if (name) {
        console.log(name)
        // filtro por nombre y me fijo si incluye lo que pase por query(name). lo guardo en la const
        // paso todo a minuscula para evitar posibles errores
        let countriesName = await country.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        countriesName.length ?
        res.status(200).send(countriesName) : res.status(404).send("El pais no se encuentra");
    } else {
        res.status(200).send(country);
    }
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const countryById = await Country.findByPk(id.toUpperCase(), {
            include: {
                // Incluime el modelo activity
                model: Activity,
                // Y de este modelo activity traeme los siguientes atributos
                attributes: ["id", "name", "difficulty", "duration", "season"],
                // Mediante los atributos
                through: {
                    attributes: []
                },
            }
        });
        // console.log(countryById);
        !countryById ? 
        res.status(404).send({msg: "El pais ingresado no existe"}) : res.status(200).json(countryById); // (o send.)
    } catch(e) {
        res.status(400).send(e)
        console.log(e);
    }
});


module.exports = router;








































