const express = require('express');
const bodyParser = require('body-parser');
//const mongoPractice = require('./mongoose');
const mongo = require('./mongo');

const app = express();

app.use(bodyParser.json());

app.post('/clients', mongo.createClients);

app.get('/clients', mongo.getClients);

app.get('/stam', (req, res, next) => {
    res.status(200);
    res.json({ message: "ok ok ok " })
});

app.listen(3001); 