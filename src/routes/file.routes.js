import express from "express";
import upload from "../middleware/upload.js";
import {
  downloadById,
  downloadByName,
  listUserFiles,
  uploadFile,
  userStats,
} from "../controller/fileController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { validate } from "../middleware/zodValidate.js";
import { uploadLimiter } from "../middleware/rateLimiter.js";
import { uploadFileSchema } from "../validation/file.validation.js";
import { fileIdSchema } from "../validation/download.validation.js";

const fileRoute = express.Router();

/* Routes */
fileRoute.post(
  "/upload",
  isAuthenticated,
  uploadLimiter,
  validate(uploadFileSchema),
  upload.single("file"),
  uploadFile
);
fileRoute.get("/user", isAuthenticated, listUserFiles);
fileRoute.get("/download/id/:fileId", validate(fileIdSchema), isAuthenticated, downloadById);
fileRoute.get("/download/name/:filename", isAuthenticated, downloadByName);
fileRoute.get("/stats", isAuthenticated, userStats);

export default fileRoute;
