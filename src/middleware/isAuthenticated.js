import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { secretKey } from "../validation/constant.js";

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  const token = bearerToken.split(" ")[1];

  const info = jwt.verify(token, secretKey);

  req.user = {
    id: info._id,
  };

  next();
});

export default isAuthenticated;
