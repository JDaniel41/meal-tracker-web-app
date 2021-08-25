const express = require("express");
const { Connection } = require("../mongo/Connection");

roomCodeRouter = express.Router({ mergeParams: true });

Connection.open().then((client) => {
    const roomCollections = client.db("restarauntData").collection("countData");

    roomCodeRouter.get("/", async (req, res) => {
        let mongoResponse = await roomCollections.findOne({
            roomCode: Number(req.params.roomCode),
        });
        console.log(req.params);

        if (mongoResponse) {
            res.send(mongoResponse.data);
        } else {
            let response = await roomCollections.insertOne({
                roomCode: Number(req.params.roomCode),
                data: [],
            });
            console.log(response);
            res.send([]);
        }
    });

    roomCodeRouter.post("/", async (req, res) => {
        let newBusiness = {
            count: Number(req.body.count),
            name: req.body.name,
        };

        let existingRoomData = await roomCollections.findOne({
            roomCode: Number(req.params.roomCode),
        });

        existingBusinesses = existingRoomData.data;

        if (
            existingBusinesses.find(
                (business) => business.name === newBusiness.name
            )
        ) {
            res.send(existingBusinesses);
        } else {
            const filter = { roomCode: Number(req.params.roomCode) };
            const updateDoc = {
                $push: {
                    data: newBusiness,
                },
            };

            let updatedData = await roomCollections.findOneAndUpdate(
                filter,
                updateDoc,
                { returnDocument: "after" }
            );

            res.send(updatedData.value.data);
        }
    });

    roomCodeRouter.put("/:businessName/:newCount", async (req, res) => {
        let filter = {
            roomCode: Number(req.params.roomCode),
            data: {
                $elemMatch: {
                    name: req.params.businessName,
                    count: { $gte: 0 },
                },
            },
        };

        let updateDoc = {
            $set: { "data.$.count": Number(req.params.newCount) },
        };

        let updateResult = await roomCollections.findOneAndUpdate(
            filter,
            updateDoc,
            { returnDocument: "after" }
        );

        if (updateResult.value) {
            res.send(updateResult.value.data);
        } else {
            res.status(404).send({
                message: `${req.params.businessName} does not exist in room ${req.params.roomCode}.`,
            });
        }
    });

    roomCodeRouter.delete("/:businessName", async (req, res) => {
        let filter = {
            roomCode: Number(req.params.roomCode),
            data: {
                $elemMatch: {
                    name: req.params.businessName,
                    count: { $gte: 0 },
                },
            },
        };

        let updateDoc = {
            $pull: { data: { name: req.params.businessName } },
        };

        let updateResult = await roomCollections.findOneAndUpdate(
            filter,
            updateDoc,
            { returnDocument: "after" }
        );

        if (updateResult.value) {
            res.send(updateResult.value.data);
        } else {
            res.status(404).send({
                message: `${req.params.businessName} does not exist in room ${req.params.roomCode}.`,
            });
        }
    });
});

module.exports = roomCodeRouter;
