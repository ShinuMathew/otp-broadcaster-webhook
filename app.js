const Express = require('express'),
    joi = require('joi'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    OTPBroadcasterRouter = require('./lib/routes/otp-broadcaster');

const app = Express();
const PORT = 3000 || process.env.PORT

app.use(bodyParser.json());
app.use(cors())

app.use('/otp-broadcaster', OTPBroadcasterRouter)

app.get("/", (req, res) => {
    res.json({
        "status" : "SUCCESS"
    })
})

app.listen(PORT, () => {
    logger.info(`Server started at Port : ${PORT}`)
});
