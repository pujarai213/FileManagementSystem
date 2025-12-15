import mongoose, { Schema } from "mongoose";

const fileSchema = Schema({
  filename: { type: String, required: true },
  filePath: { type: String, required: true },
  size: { type: Number, required: true },
  mimeType: { type: String, required: true },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadDate: { type: Date, default: Date.now },
});

export default fileSchema;
