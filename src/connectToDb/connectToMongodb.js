import mongoose from "mongoose";

const connectToMongodb = () => {
  mongoose.connect("mongodb://localhost:27017/fileManagementSystem");
  console.log("Application is connected to database successfully");
};

export default connectToMongodb;
