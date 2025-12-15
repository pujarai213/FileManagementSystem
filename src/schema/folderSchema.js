import mongoose, { Schema } from "mongoose";

const folderSchema = Schema(
    {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentFolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null, // root folder
    },
  },
  { timestamps: true }
)

export default folderSchema;