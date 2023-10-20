import { Router } from "express";

const clientRouter = Router()

clientRouter.post("/clients")
clientRouter.get("/clients/:id/orders")

export default clientRouter;