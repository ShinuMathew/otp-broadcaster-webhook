const Mongoose = require('mongoose'),
    schema = require('../schemas/mongoschemas/otp-broadcaster-schemas');

const otpSchema = new Mongoose.Schema(schema.OTP_SAVE);
const OTPModel = Mongoose.model('otp', otpSchema);

module.exports = {
    OTPModel
}