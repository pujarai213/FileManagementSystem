import express from "express";
import {
  createFolder,
  deleteFolder,
  listFolders,
  renameFolder,
} from "../controller/folderController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const folderRoute = express.Router();

folderRoute.post("/", isAuthenticated, createFolder);
folderRoute.get("/rename/:id", isAuthenticated, renameFolder);
folderRoute.delete("/delete/:id", isAuthenticated, deleteFolder);
folderRoute.get("/", isAuthenticated, listFolders);

export default folderRoute;
