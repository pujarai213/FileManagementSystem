import express from "express";
import upload from "../middleware/upload.js";
import {
  downloadById,
  downloadByName,
  listUserFiles,
  uploadFile,
} from "../controller/fileController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const fileRoute = express.Router();

/* Routes */
fileRoute.post("/upload",isAuthenticated, upload.single("file"), uploadFile);
fileRoute.get("/user", isAuthenticated, listUserFiles);
fileRoute.get("/download/id/:fileId", isAuthenticated, downloadById);
fileRoute.get("/download/name/:filename", isAuthenticated, downloadByName);

export default fileRoute;
