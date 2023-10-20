import { createClients, getClientsOrdersById } from "../repositories/clients.repository.js";

export async function createClient(req, res){
    const { name, address, phone } = req.body;
    try {
        await createClients(name, address, phone);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getCLientOrderId(req, res){
    const clientId = req.params.id;
    try {
        const orders = await getClientsOrdersById(clientId);
        if (orders.length === 0) {
            return res.status(404).send('As orders deste cliente não foram achadas.');
        }
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send(err.message);
    }
}