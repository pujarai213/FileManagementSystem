import { model } from "mongoose";
import userSchema from "./userSchema.js";
import fileSchema from "./fileSchema.js";

export const User = model("User", userSchema);

export const File = model("File", fileSchema);
