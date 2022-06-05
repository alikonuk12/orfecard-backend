const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const hostname = process.env.YOUR_HOST;
const database = process.env.DATABASE;
const API = require('./api');

mongoose.connect(database);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', API);

app.get('/', (req, res) => {
    res.send('You are not allow to display page. Please contact with Administration');
});

const server = app.listen(port, hostname, () => {
    console.log(`Server is running on ${hostname}:${port}`);
});