const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

let restaurantData = [];

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());

app.get("/api", (req, res) => {
    res.send(JSON.stringify(restaurantData));
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.post("/api", (req, res) => {
    let newBusiness = req.body;

    if (!restaurantData.find((element) => newBusiness.name === element.name)) {
        restaurantData.push(newBusiness);
    }

    res.send(JSON.stringify(restaurantData));
});

app.put("/api", (req, res) => {});

app.delete("/api/:businessName", (req, res) => {
    console.log(req.params.businessName);

    restaurantData = restaurantData.filter((element) => {
        return element.name !== req.params.businessName;
    });

    console.log(JSON.stringify(restaurantData));
    res.send(JSON.stringify(restaurantData));
});

app.listen(port, () => {
    console.log(`Example app listneing at http://localhost:${port}`);
});
