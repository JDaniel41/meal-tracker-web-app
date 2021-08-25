const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

const roomCodeRouter = require("./routes/roomCode");

//app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());

app.use("/api/:roomCode", roomCodeRouter);

/*app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});*/

app.listen(port, () => {
    console.log(`Example app listneing at http://localhost:${port}`);
});
