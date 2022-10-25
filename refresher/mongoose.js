const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const Client = require('./models/client');

//due to securtiy issue, I didn't upload my password
mongoose.connect('mongodb+srv://racheli:<password>@cluster0.tmk38vw.mongodb.net/?retryWrites=true&w=majority'
).then(() => {
    console.log('Connected to database')
}).catch(() => {
    console.log('Connection failed')
});

const createClient = async (req, res, next) => {
    const createClient = new Client({
        name: req.body.name,
        id: req.body.id,
        addres: req.body.addres,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone,
        mobilePhone: req.body.mobilePhone
    });
    const result = await createClient.save();
    console.log(typeof createClient.id);
    res.json(result);
};

const getClients = async (req, res, next) => {
    const client=new MongoClient(url);
    const clients = Client.find().exec();
    res.json(clients);
}

exports.createClient = createClient;
exports.getClients = getClients;