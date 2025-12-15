import expressAsynchHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { secretKey } from "../validation/constant.js";

let isAuthenticated = expressAsynchHandler(
  //it checks whether the token is valid or not
  async (req, res, next) => {
    //get token from postman
    let bearerToken = req.headers.authorization; //"Bearer token........"

    let token = bearerToken.split(" ")[1]; //["Bearer", "......."]
    console.log(token);

    let info = await jwt.verify(token, secretKey);

    req._id = info._id;
    // console.log(req._id)
    next();
  }
);
export default isAuthenticated;
