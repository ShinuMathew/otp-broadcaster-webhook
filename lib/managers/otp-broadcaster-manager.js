const Enum = require('../enums/enum'),
    logger = require('../../helpers/logger'),
    OTPBroadcasterService = require('../services/otp-broadcaster-service');

class OTPBroadcasterManager {

    constructor() {
        this.otpBroadcasterService = new OTPBroadcasterService()
    }

    async sendOTP(request, response) {
        logger.info(`Constructing otp data to be stored to DB`)
        let otp = request.body.otp;
        let timestamp = Date.now();
        let data = {
            'otp' : otp,
            'timestamp' : timestamp,
            'status' : Enum.OTP_PROCESS_STATUS.PENDING
        }
        logger.info(`Following data will be saved to DB:\n${JSON.stringify(data)}`)
        await this.otpBroadcasterService.saveOTPtoDB(data)
        response.json(data).status(200);
    }
}

module.exports = OTPBroadcasterManager;