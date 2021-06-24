const Enum = require('../enums/enum'),
    logger = require('../../helpers/logger'),
    _ = require('lodash'),
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
            'otp': otp,
            'timestamp': timestamp,
            'status': Enum.OTP_PROCESS_STATUS.PENDING
        }
        logger.info(`Following data will be saved to DB:\n${JSON.stringify(data)}`)
        await this.otpBroadcasterService.saveOTPtoDB(data)
        response.json(data).status(200);
    }

    async getAllOTP(request, response) {
        let otpArr = await this.otpBroadcasterService.getAllOTPs()
        response.json(otpArr).status(200);
    }

    async getLatestOTP(request, response) {
        let otpArr = await this.otpBroadcasterService.getAllOTPs()
        let latestOtp = _.sortBy(_.filter(otpArr, otp => (new Date() - otp.timestamp) / 1000 <= 100), (otp) => otp.timestamp).reverse()
        console.log(`Length ${latestOtp.length}`)
        if (latestOtp.length > 0) {
            response.json(latestOtp[0]).status(200);
        } else {
            response.status(404).json({
                "error": "No OTP was broadcasted in the last 100 seconds"
            })
        }
    }
}

module.exports = OTPBroadcasterManager;