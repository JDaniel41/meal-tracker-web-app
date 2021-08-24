const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
const MongoClient = require("mongodb").MongoClient;

let roomCollections;

const url =
    "mongodb+srv://nodeJsUser:QwEK7DxwHHrAaphU@cluster0.ilevg.mongodb.net/restarauntData?retryWrites=true&w=majority";

MongoClient.connect(url, (err, client) => {
    console.log("CONNECTED");

    roomCollections = client.db("restarauntData").collection("countData");
});
let restaurantData = {};

/*
MONGO DB Scheme
{
    roomCode: 0,
    restarauntName: name,
    count: count
}*/

//app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());

function findData(roomCode) {
    if (roomCode in restaurantData) {
        return restaurantData[roomCode];
    } else {
        restaurantData[roomCode] = [];
        return [];
    }
}

function parseMongoData(data) {
    return {
        name: data.name,
        count: data.count,
    };
}

app.get("/api/:roomCode", async (req, res) => {
    let mongoResponse = await roomCollections.findOne({
        roomCode: Number(req.params.roomCode),
    });

    res.send(mongoResponse.data);
});

/*app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});*/

app.post("/api/:roomCode", async (req, res) => {
    let newBusinessDoc = {
        count: Number(req.body.count),
        name: req.body.name,
    };

    //
    let existingData = await roomCollections.findOne({
        roomCode: Number(req.params.roomCode),
    });

    let existingDataExists = existingData.data.find(
        (element) =>
            element.count === newBusinessDoc.count &&
            element.name === newBusinessDoc.name
    );

    if (!existingDataExists) {
        let result = await roomCollections.insertOne(newBusinessDoc);
        console.log(result);
    }

    let newData = await roomCollections.findOne({
        roomCode: Number(req.params.roomCode),
    });

    res.send(newData.data);
});

app.put("/api/:roomCode/:businessName/:newCount", (req, res) => {
    console.log("PUT RUNNING");
    console.log(req.params);
    console.log(restaurantData);
    let restaurantToUpdate = restaurantData[req.params.roomCode].find(
        (element) => {
            return element.name === req.params.businessName;
        }
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
