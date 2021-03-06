const Express = require('express'),
    joi = require('joi'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    OTPBroadcasterRouter = require('./lib/routes/otp-broadcaster'),
    logger = require('./helpers/logger');

const app = Express();
const PORT = process.env.PORT || 5000

logger.info("Registering middleware")
app.use(bodyParser.json());
app.use(cors())

app.use('/otp-broadcaster', OTPBroadcasterRouter)

app.get("/", (req, res) => {
    res.json({
        "status" : "SUCCESS! App started successfully"
    })
})

app.listen(PORT, () => {
    logger.info(`Server started at Port : ${PORT}`)
});
