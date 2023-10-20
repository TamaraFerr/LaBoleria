import { Router } from "express";
import { createOrders, getOrders, getOrdersById } from "../controllers/orders.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import ordersSchema from "../schemas/order.schema.js";

const ordersRouter = Router()

ordersRouter.post("/order", validateSchema(ordersSchema), createOrders)
ordersRouter.get("/orders", getOrders)
ordersRouter.get("/orders/:id", getOrdersById)

export default ordersRouter;