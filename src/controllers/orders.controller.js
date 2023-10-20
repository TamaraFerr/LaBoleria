import { createOrder, getCakesById, getClientsById, getOrderById, getOrder } from "../repositories/order.repository.js";
import db from "../database/database.connection.js";

export async function createOrders(req, res){
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {
        const clients = await getClientsById(clientId);
        if (!clients) return res.sendStatus(404);

        const cakes = await getCakesById(cakeId);
        if (!cakes) return res.sendStatus(404);

        await createOrder(clientId, cakeId, quantity, totalPrice, new Date());
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getOrders(req, res){
    try {
        const data = req.query.date;
        const order = await getOrder(data);
        
        if (order.length === 0) {
            return res.status(404).json([]);
        }

        const OrderFormated = order.map(order => ({
            client: {
                id: order.clientId,
                name: order.clientName,
                address: order.clientAddress,
                phone: order.clientPhone,
            },
            cake: {
                id: order.cakeId,
                name: order.cakeName,
                price: parseFloat(order.cakePrice),
                description: order.cakeDescription,
                image: order.cakeImage,
            },
            orderId: order.orderId,
            createdAt: order.createdAt,
            quantity: order.quantity,
            totalPrice: parseFloat(order.totalPrice),
        }));

        res.status(200).json(OrderFormated);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getOrdersById(){
    const orderId = parseInt(req.params.id, 10);
    
    try {
        const order = await getOrderById(orderId);
        
        if (!order) {
            return res.status(404).send({message: "não foi encontrada estar order"});
        }

        const orderFormated = {
            client: {
                id: order.clientId,
                name: order.clientName,
                address: order.clientAddress,
                phone: order.clientPhone,
            },
            cake: {
                id: order.cakeId,
                name: order.cakeName,
                price: parseFloat(order.cakePrice),
                description: order.cakeDescription,
                image: order.cakeImage,
            },
            orderId: order.orderId,
            createdAt: order.createdAt,
            quantity: order.quantity,
            totalPrice: parseFloat(order.totalPrice),
        };

        res.status(200).json(orderFormated);
    } catch (err) {
        res.status(500).send(err.message);
    }
}