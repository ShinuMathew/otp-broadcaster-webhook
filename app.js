const Express = require('express'),
    joi = require('joi'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    OTPBroadcasterRouter = require('./lib/routes/otp-broadcaster');

const app = Express();

app.use(bodyParser.json());
app.use(cors())

app.use('/otp-broadcaster', OTPBroadcasterRouter)

app.listen(3000);