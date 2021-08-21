const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

let restaurantData = [];

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());

app.get("/api", (req, res) => {
    res.send(restaurantData);
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.post("/api", (req, res) => {
    let newBusiness = req.body;

    if (!restaurantData.find((element) => newBusiness.name === element.name)) {
        restaurantData.push(newBusiness);
    }

    res.send(restaurantData);
});

app.put("/api/:businessName/:newCount", (req, res) => {
    console.log("PUT RUNNING");
    console.log(req.params);
    let restaurantToUpdate = restaurantData.find(
        (element) => element.name === req.params.businessName
    );

    if (restaurantToUpdate) {
        restaurantToUpdate.count = req.params.newCount;
        res.send(restaurantData);
    } else {
        res.status(404).send(
            JSON.stringify({ message: "Restaraunt does not exist" })
        );
    }
});

app.delete("/api/:businessName", (req, res) => {
    console.log(req.params.businessName);

    restaurantData = restaurantData.filter((element) => {
        return element.name !== req.params.businessName;
    });

    console.log(JSON.stringify(restaurantData));
    res.send(restaurantData);
});

app.listen(port, () => {
    console.log(`Example app listneing at http://localhost:${port}`);
});
