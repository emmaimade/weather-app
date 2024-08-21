const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4500;
const API_KEY = process.env.API_KEY;

app.set("view engine", "ejs");

// set body parser
app.use(express.urlencoded({ extended: true }));

let result;

app.get("/", (req, res) => {
    res.render("index", { data: result, error: null });
});

app.post("/weather", async (req, res) => {
    try {
        const { city } = req.body;

        if (!city) {
            return res.render("index", {
                data: null,
                error: "Please provide a city"
            });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

        const response = await axios.get(url);
        result = response.data;

        res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.render("index", {
            data: null,
            error: "City not found, please enter a valid city"
        });
    }


});

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});