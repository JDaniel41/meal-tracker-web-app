const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

let restaurantData = [];

app.use(bodyParser.json());

app.post("/api", (req, res) => {
    console.log("Request Body");
    console.log(req.body);
    let newBusiness = req.body;
    restaurantData.push(newBusiness);

    res.send(JSON.stringify(restaurantData));
});

app.get("/api", (req, res) => {
    res.send(JSON.stringify(restaurantData));
});

app.listen(port, () => {
    console.log(`Example app listneing at http://localhost:${port}`);
});
