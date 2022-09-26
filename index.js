const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const hostname = process.env.YOUR_HOST;
const database = process.env.DATABASE;
const API = require('./api');

const whitelist = [
    'http://localhost:3000', 
    'https://orfecard.com', 
    'https://www.orfecard.com', 
    'http://78.135.105.164:3000'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

mongoose.connect(database);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '100mb' }));
app.use(cors(corsOptions));
app.use('/api', API);

app.get('/', (req, res) => {
    res.send('You are not allow to display page. Please contact with Administration');
});

const server = app.listen(port, hostname, () => {
    console.log(`Server is running on ${hostname}:${port}`);
});