const express = require('express'),
    router = express.Router(),
    OTPBroadcasterManager = require('../managers/otp-broadcaster-manager');


class OTPBroadcaster {   

    sendOTPRouteHandler(request, response) {        
        new OTPBroadcasterManager().sendOTP(request, response)
    }
}

function registerRoutes() {
    this.otpBroadcaster = new OTPBroadcaster()    
    router.post('/send-otp', this.otpBroadcaster.sendOTPRouteHandler)
}

registerRoutes();

module.exports = router;