const Enum = require('../../enums/enum');

module.exports = {
    OTP_SAVE : {
        otp : {
            type : String,
            required: true
        },
        timestamp : {
            type : Date,
            required: true
        },
        status : {
            type : Enum.OTP_PROCESS_STATUS,
            required : true
        }
    }
}