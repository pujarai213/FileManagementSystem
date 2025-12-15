import fs from "fs";
import { File } from "../schema/model.js";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

/* ---------- UPLOAD FILE ---------- */
export const uploadFile = expressAsyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileData = await File.create({
    filename: file.originalname,
    filePath: file.path,
    size: file.size,
    mimeType: file.mimetype,
    folder: req.body.folder || "root",
    ownerId: new mongoose.Types.ObjectId(req.user.id),
  });

  res.status(201).json({
    message: "File uploaded successfully",
    file: fileData,
  });
});

/* ---------- LIST USER FILES ---------- */
export const listUserFiles = expressAsyncHandler(async (req, res) => {
  const files = await File.find({
    ownerId: new mongoose.Types.ObjectId(req.user.id),
  }).sort({ uploadDate: -1 });

  /* console.log("USER ID:", req.user.id);
  console.log("TYPE:", typeof req.user.id); */

  res.status(200).json({
    count: files.length,
    files,
  });
});

/* ---------- DOWNLOAD BY FILE ID ---------- */
export const downloadById = expressAsyncHandler(async (req, res) => {
  const file = await File.findById(req.params.fileId);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  if (!fs.existsSync(file.filePath)) {
    return res.status(404).json({ message: "File missing from storage" });
  }

  res.download(file.filePath, file.filename);
});

/* ---------- DOWNLOAD BY FILENAME ---------- */
export const downloadByName = expressAsyncHandler(async (req, res) => {
  const file = await File.findOne({ filename: req.params.filename });

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  if (!fs.existsSync(file.filePath)) {
    return res.status(404).json({ message: "File missing from storage" });
  }

  res.download(file.filePath, file.filename);
});
