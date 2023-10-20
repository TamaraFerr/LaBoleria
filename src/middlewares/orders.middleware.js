import { findingCakes } from "../repositories/cakes.repository.js";
import { findingClients } from "../repositories/clients.repository.js";
import { findingAllOrders, findingDays, findingOrderById } from "../repositories/order.repository.js";


export async function orderValidate (req, res, next) {
    const { clientId, cakeId, quantity } = req.body;
    const existCakes = await findingCakes(cakeId);
    const existClients = await findingClients(clientId);
    console.log(clientId, cakeId, quantity)
  
    if (!existCakes || !existClients) {
      res.sendStatus(404);
      return;
    }
  
    if (quantity <= 0 || quantity >= 5) {
      res.sendStatus(400);
      return;
    }
  
    const totalPrice = (quantity * Number(existCakes.price)).toFixed(2);
  
    res.locals.body = {
      clientId,
      cakeId,
      quantity,
      totalPrice
    }
    //console.log(res.locals.body.clientId)
  
    next();
}
  
export async function allOrders (req, res, next) {
    const { date } = req.body;
    let orders = await findingAllOrders();
    console.log(orders)
   
    if (date) orders = await findingDays(date);
    if (orders.length === 0) return res.status(404).send([]);
    orders = orders.map(order => order.resulte);
    res.locals.body = orders;

    
    next();
}
  
export async function ordersById (req, res, next) {
    const { id } = req.params;
    const order = await findingOrderById(id);
    
    if (order.length === 0) return res.sendStatus(404);
    res.locals.body = order[0].resulte;
      
    next();
}