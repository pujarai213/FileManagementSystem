import { Router } from "express";
import { createUserController, loginUserController } from "../controller/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


const userRoute = Router();

userRoute.route("/").post(createUserController).get(isAuthenticated)

userRoute.route("/login").post(loginUserController)

export default userRoute;