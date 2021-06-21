const OTPBroadcasterService = require('../services/otp-broadcaster-service'),
    Enum = require('../enums/enum');

class OTPBroadcasterManager {

    constructor() {
        this.otpBroadcasterService = new OTPBroadcasterService()
    }

    async sendOTP(request, response) {
        let otp = request.body.otp;
        let timestamp = Date.now();
        let data = {
            'otp' : otp,
            'timestamp' : timestamp,
            'status' : Enum.OTP_PROCESS_STATUS.PENDING
        }
        await this.otpBroadcasterService.saveOTPtoDB(data)
        response.json(data).status(200);
    }
}

module.exports = OTPBroadcasterManager;