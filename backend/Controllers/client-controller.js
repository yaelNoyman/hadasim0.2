const { validationResult } = require('express-validator')
const Client= require('../models/client');


const getAllClients =async (req, res, next) => {
    let clients;
    try{
        clients=await Client.find();
     
    }catch(e) {
      res.status(500).json({message:"got error"})
    }
    res.json({clients : clients.map(c=> c.toObject({getters:true}))})
};

const getClientById =async (req, res, next) => {
    const clientId = req.params.cid;
    let client;
    try{
       client= await Client.findById(clientId) 
    }
    catch{
        return res.status(500).json({ massage: "Could not find a client with id " + clientId })
    }
   
    if (!client) {
        return res.status(404).json({ massage: "Could not find a client with id " + clientId })
    }
    res.json(client);
};


const createClient = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        res.status(422).json({ massage: "got errors" + errors })
    }

    const { name, id, address, birthday, phone, mobilePhone, coronaInfo } = req.body;
    const newClient = new Client({
        name,
        id,
        address,
        birthday,
        phone,
        mobilePhone
    });

    try{
      await newClient.save();

    }catch (e)
    {
    res.status(500).json({message:"'could not create client, please try sgain'"})
    
    }
    res.status(201).json({ client: newClient })
  
}

const updateClientById = async (req, res, next) => {
    const { name, id, address, birthday, phone, mobilePhone } = req.body;
    const clientId = req.params.cid;

    let updateClient;
    try{
        updateClient= await Client.findById(clientId);
    }
    catch (er){
        return res.status(500).json({ massage: "something went wrong" })
    }
  
    updateClient.name = name;
    updateClient.address = address;
    updateClient.birthday = birthday;
    updateClient.phone = phone;
    updateClient.mobilePhone = mobilePhone;

    try{
        await updateClient.save();
    } catch(e){
        return res.status(500).json({ massage: "something went wrong" })

    }
    res.status(200).json({ client: { updateClient } })

}

const deleteClientById = async (req, res, next) => {
    const clientId = req.params.cid;
    let client;

    try{
        client= await Client.findById(clientId);
        await client.remove();

    }
    catch (er){
        return res.status(500).json({ massage: "something went wrong, could not delete client" })
    }
}

exports.getAllClients = getAllClients;
exports.getClientById = getClientById;
exports.createClient = createClient;
exports.updateClientById = updateClientById;
exports.deleteClientById = deleteClientById;