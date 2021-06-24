const express = require('express'),
    router = express.Router(),
    OTPBroadcasterManager = require('../managers/otp-broadcaster-manager'),
    logger = require('../../helpers/logger');

class OTPBroadcaster {   

    sendOTPRouteHandler(request, response) {   
        logger.info(`sendOTPRouteHandler : initializing OTP Broadcast request`)     
        new OTPBroadcasterManager().sendOTP(request, response)
    }

    getAllOTP(request, response) {
        logger.info(`getAllOTP : initializing get all OTP request`)  
        new OTPBroadcasterManager().getAllOTP(request, response)
    }

    getLatestOTP(request, response) {
        logger.info(`getLatestOTP : initializing get latest otp request`)  
        new OTPBroadcasterManager().getLatestOTP(request, response)
    }
}

function registerRoutes() {
    this.otpBroadcaster = new OTPBroadcaster()    
    router.post('/send-otp', this.otpBroadcaster.sendOTPRouteHandler)
    router.get('/otp-all', this.otpBroadcaster.getAllOTP)
    router.get('/otp-latest', this.otpBroadcaster.getLatestOTP)
}

registerRoutes();

module.exports = router;