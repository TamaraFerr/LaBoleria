import { createCakes, getCakesByName } from "../repositories/cakes.repository.js";

export async function createCake(req, res) {
    const { name, price, image, description } = req.body;
    try {
        const cakesNames = await getCakesByName(name);
        if (cakesNames) return res.status(409).send({ message: "Este bolo já existe." });

        await createCakes(name, price, image, description);
        res.sendStatus(201);

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
}