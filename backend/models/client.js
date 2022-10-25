const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const  clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    addres: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    phone: { type: String, required: true },
    mobilePhone: { type: String, required: true },
});

module.exports = mongoose.model('Client' , clientSchema);