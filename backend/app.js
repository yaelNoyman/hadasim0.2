const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const clientRoutes = require('./routes/clients-routes')

const app = express();
app.use(bodyParser.json());
app.use('/api/client', clientRoutes);

//connecting to the mongo db
mongoose.connect("mongodb+srv://racheli:a1234567@cluster0.tmk38vw.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        app.listen(5000)
    })
    .catch(err => {
        console.log(err)
    });

