import { Request, Response, Router } from "express";
import { tokenValidation } from "../middlewares/dahsboardMiddleware";
import { updateData } from "../controllers/dashboardController";
const updateRouter = Router()

updateRouter.post('/edit', tokenValidation, updateData)

export default updateRouter