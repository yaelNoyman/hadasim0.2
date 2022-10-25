const MongoClient = require('mongodb').MongoClient;

//due to securtiy issue, I didn't upload my password
const url = 'mongodb+srv://racheli:<password>@cluster0.tmk38vw.mongodb.net/hmo?retryWrites=true&w=majority'

const createClients = async (req, res, next) => {
    console.log(req.body);
    const clientnew = req.body;

    const newClient = {
        name: clientnew.name,
        id: clientnew.id,
        addres: clientnew.addres,
        dateOfBirth: clientnew.dateOfBirth,
        phone: clientnew.phone,
        mobilePhone: clientnew.mobilePhone
    }
   
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db();
        const result = db.collection('clients').insertOne(newClient);
    } catch (err) {
        return res.json({ message: "errrrr" })
    };
    client.close();
    res.json(newClient);
};

const getClients = async (req, res, next) => {
    const client = new MongoClient(url);
    let clients;
    try {
        await client.connect();
        const db = client.db('test');
        const client = await db.collection('clients').find().toArray();
    } catch (error) {
        return res.json({ message: error });
    };
    client.close();

    res.json(clients);
};

exports.createClients = createClients;
exports.getClients = getClients;
