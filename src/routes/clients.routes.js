import { Router } from "express";
import { createClient, getCLientOrderId } from "../controllers/clients.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import clientsSchema from "../schemas/client.schema.js";

const clientRouter = Router()

clientRouter.post("/clients", validateSchema(clientsSchema), createClient)
clientRouter.get("/clients/:id/orders", getCLientOrderId)

export default clientRouter;