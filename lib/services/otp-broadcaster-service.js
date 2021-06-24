const MongoClient = require('../client/mongo-client'),
    Constants = require('../enums/constants'),
    logger = require('../../helpers/logger'),
    { OTP_SAVE } = require('../schemas/mongoschemas/otp-broadcaster-schemas'),
    { OTPModel } = require('../models/otp-save'),
    _ = require('lodash');


class OTPBroadcasterService {

    constructor() {
        this.mongoClient = new MongoClient();        
    }

    async saveOTPtoDB(otpData) {
        try {
            this.mongoose = await this.mongoClient.getConnection(Constants.DATABASE.OTP_BROADCAST);
            logger.info(`Saving data to collection 'otp' in DB : ${Constants.DATABASE.OTP_BROADCAST}`)
            let otpSave = new OTPSaveModel(otpData);
            await otpSave.save()
        } catch(err) {
            logger.error(`Following error occured when saving otp data to DB :\n${err}`)
        }
    }

    async getAllOTPs() {
        try {
            this.mongoose = await this.mongoClient.getConnection(Constants.DATABASE.OTP_BROADCAST);
            logger.info(`Fetching all data from collection 'otp' in DB : ${Constants.DATABASE.OTP_BROADCAST}`)
            let result = await OTPModel.find({})
            let resArr = _.map(result, otp => {
                return {
                    otp : otp.otp,
                    timestamp : otp.timestamp,
                    status : otp.status
                }
            })
            return _.sortBy(resArr, (otp) => otp.timestamp).reverse()
        } catch(err) {
            logger.error(`Following error occured when fetching otp data from DB :\n${err}`)
        }
    }
}

module.exports = OTPBroadcasterService;