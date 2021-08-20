const express = require("express");
const app = express();
const port = 3001;

async function main() {
    const MongoClient = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://admin-meal-tracker:1Mg5eLuBHvqA3NsO@cluster0.dcu5m.mongodb.net/meal_tracker?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
    });
}
main().catch(console.error);

app.get("/api", (req, res) => {
    res.send(JSON.stringify({ response: "Response Sent" }));
});

app.listen(port, () => {
    console.log(`Example app listneing at http://localhost:${port}`);
});
