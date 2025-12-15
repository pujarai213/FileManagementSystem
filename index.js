import express, { json } from "express";
import connectToMongodb from "./src/connectToDb/connectToMongodb.js";
import userRoute from "./src/routes/userRoute.js";
import fileRoute from "./src/routes/file.routes.js";

let app = express();

app.listen(8000, () => {
  console.log("Application is listening on port 8000");
  connectToMongodb();
});

app.use(json());

app.use("/users", userRoute);

// Static access to uploaded files
app.use("/uploads", express.static("uploads"));

app.use("/api/files", fileRoute);
