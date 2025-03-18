import { Router } from "express";
import { RefundsController } from "@/controllers/refunds-controller";

const refundsController = new RefundsController()
const refundsRoutes =  Router()

refundsRoutes.post("/", refundsController.create)

refundsRoutes.get("/", refundsController.index)

export { refundsRoutes }