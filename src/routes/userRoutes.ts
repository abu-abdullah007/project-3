import { Router } from "express";
import { createUser } from "../controllers/createUserController";
import { checkUserMiddleware } from "../middlewares/userMiddleware";
import { loginUser } from "../controllers/createUserController";
import { checkDataValidation } from "../middlewares/userMiddleware";
import { tokenValidation } from "../middlewares/dahsboardMiddleware";
import { sendDashboardData } from "../controllers/dashboardController";

const userRouter = Router()

userRouter.post('/signup', checkUserMiddleware, createUser);

userRouter.post('/login', checkDataValidation, loginUser)

userRouter.post('/dashboard', tokenValidation, sendDashboardData)


export default userRouter