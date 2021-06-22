const MongoClient = require('../client/mongo-client'),
    Constants = require('../enums/constants'),
    logger = require('../../helpers/logger'),
    { OTP_SAVE } = require('../schemas/mongoschemas/otp-broadcaster-schemas'),
    { OTPModel } = require('../models/otp-save');


class OTPBroadcasterService {

    constructor() {
        this.mongoClient = new MongoClient();        
    }

    async saveOTPtoDB(otpData) {
        try {
            this.mongoose = await this.mongoClient.getConnection(Constants.DATABASE.OTP_BROADCAST);                                    
            logger.info(`Saving data to collection 'otp' in DB : ${Constants.DATABASE.OTP_BROADCAST}`)
            let otpSave = new OTPModel(otpData);
            await otpSave.save()
        } catch(err) {
            logger.error(`Following error occured :\n${err}`)
        }
    }
}

module.exports = OTPBroadcasterService;