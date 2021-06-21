const MongoClient = require('../client/mongo-client'),
    Constants = require('../enums/constants'),
    {
        OTP_SAVE
    } = require('../schemas/mongoschemas/otp-broadcaster-schemas');


class OTPBroadcasterService {

    constructor() {
        this.mongoClient = new MongoClient();
        this.mongoose = this.mongoClient.getConnection(Constants.DATABASE.OTP_BROADCAST);
    }

    async saveOTPtoDB(otpData) {
        try {
            console.log(`DAta \n\n ${JSON.stringify(otpData)}`)
            let otpSaveSchema = this.mongoose.Schema(OTP_SAVE)
            let OTPSaveModel = this.mongoose.model('otpBroadcasterModel', otpSaveSchema)
            let otpSave = new OTPSaveModel(otpData);
            await otpSave.save()
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = OTPBroadcasterService;