import { createCake } from "../repositories/cakes.repository.js";

export async function cakeCreated (req, res) {
    const { name, price, image, description } = req.body;

    try {
        await createCake( name, price, image, description );

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    };
};