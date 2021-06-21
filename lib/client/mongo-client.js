const mongoose = require('mongoose'),
    config = require('../../config/db-config'),
    logger = require('../../helpers/logger'),
    yargs = require('yargs'),
    Enum = require('../../lib/enums/enum');

class MongoClient {
    async getConnection(database) {
        logger.info(`Attempting to connect \n${database} database...`);
        if (mongoose.connection.db === undefined || mongoose.connection.db.databaseName !== database)
            await this.createNewConnection(database)
        else
            logger.info(`Connection already exists for : \n${mongoose.connection.db.databaseName}`);
        return mongoose;
    }

    async createNewConnection(database) {
        try {
            let connectionString = (yargs.argv.db_type == Enum.DB_CLUSTER.LOCAL) 
                                    ? `${config.db.protocol}://${config.db.host}:${config.db.port}/${database}` 
                                    : this._getRemoteClusterConnection(database)
            await mongoose.connect(connectionString);
            logger.info(`Connect to mongo db : ${mongoose.connection.db.databaseName}`);
        } catch (err) {
            logger.error(`Unable to connect to mongo db. Following error occured :\n${err}`)
        }
    }

    _getRemoteClusterConnection(database) {
        let connectionString = config.cloud_db.replace("${database}", database)
        return connectionString;
    }
}

module.exports = MongoClient;