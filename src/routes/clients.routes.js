import { Router } from "express";
import { createdClient, getClientsOrders } from "../controllers/clients.controller.js";
import { clientOrdersValidate } from "../middlewares/clients.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import clientsSchema from "../schemas/client.schema.js";

const clientRouter = Router()

clientRouter.post("/clients", validateSchema(clientsSchema), createdClient)
clientRouter.get("/clients/:id/orders", clientOrdersValidate ,getClientsOrders)

export default clientRouter;