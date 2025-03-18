import { Router } from "express";
import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const refundsController = new RefundsController()
const refundsRoutes =  Router()

refundsRoutes.post("/", verifyUserAuthorization(["employee"]), refundsController.create)

refundsRoutes.get("/", verifyUserAuthorization(["manager"]), refundsController.index)

export { refundsRoutes }