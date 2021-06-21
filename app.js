const Express = require('express'),
    joi = require('joi'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    OTPBroadcasterRouter = require('./lib/routes/otp-broadcaster'),
    logger = require('./helpers/logger');

const app = Express();
const PORT = 3000 || Process.ENV['PORT']

logger.info("Registering middleware")
app.use(bodyParser.json());
app.use(cors())

app.use('/otp-broadcaster', OTPBroadcasterRouter)

app.listen(PORT, () => {
    logger.info(`Server started at Port : ${PORT}`)
});