import { findingClients, findingClientsOrders } from "../repositories/clients.repository.js";

export async function clientOrdersValidate (req, res, next) {
    const { id } = req.params;
    const client = await findingClients(id);
    const orders = await findingClientsOrders(id);
  
    if (!client || orders.length === 0) {
      res.sendStatus(404);
      return;
    }
    
    res.locals.body = orders;
  
    next();
}