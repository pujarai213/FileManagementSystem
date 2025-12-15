import express from "express";
import { File } from "../schema/model.js";
import upload from "../middleware/upload.js";

const fileRoute = express.Router();

fileRoute.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const fileData = await File.create({
      filename: file.originalname,
      filePath: file.path,
      size: file.size,
      mimeType: file.mimetype,
      folder: req.body.folder || "root",
      ownerId: req.body.ownerId,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: fileData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default fileRoute;
