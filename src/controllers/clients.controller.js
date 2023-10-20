import { createClient } from "../repositories/clients.repository.js";

export async function createdClient(req, res) {
    const { name, address, phone } = req.body;

    try {
        await createClient( name, address, phone );

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    };
};

export async function getClientsOrders(req, res) {
    try {
        return res.status(200).send(res.locals.body);
    } catch (error) {
        return res.status(500).send(error);
    };
};
