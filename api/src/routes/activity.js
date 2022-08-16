const { Router } = require('express');
const router = Router();
const { Activity } = require('../db.js');

router.post("/", async (req, res) => {
    const {name, difficulty, duration, season, countriesId} = req.body;
    try {
        const newActivity = await Activity.create({
            name: name,
            difficulty: difficulty,
            duration: duration,
            season: season,
        });

        newActivity.addCountry(countriesId);
        // res.json(newActivity);
        // status 201 -> creado
        res.status(201).send(newActivity);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.get("/all", async (req, res) => {
    try {
        const activities = await Activity.findAll();
        if (activities) {
            res.json(activities);
        } else {
            res.status(404).send("Actividad no encontrada")
        }
    } catch(e){
        res.status(404).json(e);
    }
});

module.exports = router;

