import { createOrder } from "../repositories/order.repository.js";

export async function createdOrders (req, res) {
    const { clientId, cakeId, quantity, totalPrice } = res.locals.body;

    try {
        await createOrder(clientId, cakeId, quantity, totalPrice);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    };
};

export async function getAllOrders (req, res) {
    try {
        return res.status(200).send(res.locals.body);
    } catch (error) {
        return res.status(500).send(error);
    };
};