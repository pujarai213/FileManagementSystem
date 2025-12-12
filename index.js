import express, { json } from "express";
import connectToMongodb from "./src/connectToDb/connectToMongodb.js";
import userRoute from "./src/routes/userRoute.js";

let app = express();

app.listen(8000, () => {
  console.log("Application is listening on port 8000");
  connectToMongodb();
});

app.use(json());

app.use("/users", userRoute)