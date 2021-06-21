const mongoose = require('mongoose'),
    config = require('../../config/db-config');

class MongoClient {
    getConnection(database) {
        if (mongoose.connection.db === undefined || mongoose.connection.db.databaseName !== database)
            this.createNewConnection(database)
        console.log(mongoose)
        return mongoose;
    }

    createNewConnection(database) {
        mongoose.connect(`${config.db.protocol}://${config.db.host}:${config.db.port}/${database}`)
            .then(() => {
                console.log("Connected to Mongo DB")
                return mongoose;
            })
            .catch(err => console.log(err));
    }
}

module.exports = MongoClient;