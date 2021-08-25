const MongoClient = require("mongodb").MongoClient;

class Connection {
    static async open() {
        if (this.client) return this.client;

        this.client = await MongoClient.connect(this.url);
        return this.client;
    }
}

Connection.db = null;
Connection.url =
    "mongodb+srv://nodeJsUser:QwEK7DxwHHrAaphU@cluster0.ilevg.mongodb.net/restarauntData?retryWrites=true&w=majority";

module.exports = { Connection };
