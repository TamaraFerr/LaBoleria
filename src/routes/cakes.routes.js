import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import cakesSchema from "../schemas/cake.schema.js";
import { cakeCreated } from "../controllers/cakes.controller.js";
import { validateCakes } from "../middlewares/cakes.middleware.js";

const cakesRouter = Router()

cakesRouter.post("/cakes", validateSchema(cakesSchema), validateCakes, cakeCreated)

export default cakesRouter;