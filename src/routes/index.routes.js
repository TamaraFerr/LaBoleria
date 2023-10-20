import { Router } from "express";
import cakesRouter from "./cakes.routes.js";
import clientRouter from "./clients.routes.js";
import ordersRouter from "./orders.routes.js";

const router = Router()

router.use(cakesRouter)
router.use(clientRouter)
router.use(ordersRouter)

export default router;