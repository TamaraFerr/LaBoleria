import { registCakes } from "../repositories/cakes.repository.js";

export async function validateCakes (req, res, next) {
    const { name, price } = req.body;
  
    try {
      const existCake = await registCakes(name);
  
      if (existCake) {
            res.sendStatus(409);
            return;
        }
  
      if (Number(price) <= 0) {
            res.sendStatus(400);
            return;
        }
  
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}