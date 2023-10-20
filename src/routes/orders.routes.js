import { Router } from "express";
import { createdOrders, getAllOrders } from "../controllers/orders.controller.js";
import { allOrders, ordersById, orderValidate } from "../middlewares/orders.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import ordersSchema from "../schemas/order.schema.js";

const ordersRouter = Router()

ordersRouter.post("/order", validateSchema(ordersSchema), orderValidate ,createdOrders)
ordersRouter.get("/orders", allOrders ,getAllOrders)
ordersRouter.get("/orders/:id", ordersById ,getAllOrders)

export default ordersRouter;