import { Router } from "express";
import { createUserController, loginUserController } from "../controller/userController.js";


const userRoute = Router();

userRoute.route("/").post(createUserController)

userRoute.route("/login").post(loginUserController)

export default userRoute;