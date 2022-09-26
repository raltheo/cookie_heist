const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const path = require('path');

const db = require('./models');
const backdoorRoute = require("./routes/backdoor")
const authRoute = require("./routes/auth")
const dataRoute = require("./routes/data")
const userRoute = require("./routes/user")
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 25, 
	standardHeaders: true, 
	legacyHeaders: false, 
})
app.use(limiter)
app.disable('x-powered-by');
db.sequelize.sync();
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));

app.use("/api", backdoorRoute);
app.use("/api", authRoute);
app.use("/api", dataRoute);
app.use("/api", userRoute);

module.exports = app; 