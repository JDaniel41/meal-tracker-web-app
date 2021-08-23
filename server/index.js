const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

const firebase = require("firebase/app");
require("firebase/database");

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: "AIzaSyDhG50KUK4-KPGYtb2d4YnErwm40G4fojA",
    authDomain: "food-counter-16b59.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://food-counter-16b59-default-rtdb.firebaseio.com/",
    storageBucket: "food-counter-16b59.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();

// Get a reference to the database service
var database = firebase.database();

let restaurantData = {};
/*
{
    roomCode1: [],
    roomCode2: []
}
*/

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());

function findData(roomCode) {
    if (roomCode in restaurantData) {
        return restaurantData[roomCode];
    } else {
        restaurantData[roomCode] = [];
        return [];
    }
}

app.get("/api/:roomCode", (req, res) => {
    roomData = findData(req.params.roomCode);
    console.log(req.params.roomCode);
    console.log(roomData);
    console.log(restaurantData);
    res.send(roomData);
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.post("/api/:roomCode", (req, res) => {
    console.log(req.params.roomCode);
    console.log(restaurantData);
    console.log(restaurantData[req.params.roomCode]);
    let newBusiness = req.body;

    if (
        !restaurantData[req.params.roomCode].find(
            (element) => newBusiness.name === element.name
        )
    ) {
        restaurantData[req.params.roomCode].push(newBusiness);
    }

    res.send(restaurantData[req.params.roomCode]);
});

app.put("/api/:roomCode/:businessName/:newCount", (req, res) => {
    console.log("PUT RUNNING");
    console.log(req.params);
    console.log(restaurantData);
    let restaurantToUpdate = restaurantData[req.params.roomCode].find(
        (element) => element.name === req.params.businessName
    );

    if (restaurantToUpdate) {
        restaurantToUpdate.count = req.params.newCount;
        res.send(restaurantData[req.params.roomCode]);
    } else {
        res.status(404).send(
            JSON.stringify({ message: "Restaraunt does not exist" })
        );
    }
});

app.delete("/api/:roomCode/:businessName", (req, res) => {
    console.log(req.params.businessName);

    restaurantData[req.params.roomCode] = restaurantData[
        req.params.roomCode
    ].filter((element) => {
        return element.name !== req.params.businessName;
    });

    res.send(restaurantData[req.params.roomCode]);
});

app.listen(port, () => {
    console.log(`Example app listneing at http://localhost:${port}`);
});
