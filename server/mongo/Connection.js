const MongoClient = require("mongodb").MongoClient;

class Connection {
    static async open() {
        if (this.client) return this.client;

        try {
            this.client = await MongoClient.connect(this.url);
            return this.client;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

Connection.db = null;
Connection.url = `mongodb+srv://nodeJsUser:${process.env.MONGO_PASSWORD}@cluster0.ilevg.mongodb.net/restarauntData?retryWrites=true&w=majority`;

module.exports = { Connection };
