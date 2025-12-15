import expressAsynchHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../schema/model.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../validation/constant.js";

export const createUserController = expressAsynchHandler(async (req, res, next) => {
  let data = req.body;
  let hashedPassword = await bcrypt.hash(data.password, 10);
  data = {
    ...data,
    password: hashedPassword,
  };
  let result = await User.create(data);

  let info = {
    _id: result._id,
  };
  let expiryInfo = { expiresIn: "365d" };

  let token = jwt.sign(info, secretKey, expiryInfo);

  res.status(201).json({
      success: true,
      message: "user created successfully",
      result: result,
    });
});

export const loginUserController = expressAsynchHandler(
  async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      let isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        //TOKEN
        let info = {
          _id: user._id,
        };
        let expiryInfo = { expiresIn: "365d" };

        let token = jwt.sign(info, secretKey, expiryInfo);

        res.status(200).json({
          success: true,
          message: "Login Successfully",
          data: user,
          token: token
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid credential",
        });
      }
    } else {
      res.status(401).json({
        //login ko case ma status always 401
        success: false,
        message: "Invalid credention",
      });
    }
  }
);
