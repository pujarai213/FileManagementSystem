import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// base uploads directory
const UPLOAD_BASE = path.join(__dirname, "..", "uploads");

const getUploadFolder = (mimeType) => {
  if (mimeType.startsWith("image")) return "images";
  if (mimeType === "application/pdf") return "documents";
  if (mimeType.startsWith("video")) return "videos";
  return "others";
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const folderName = getUploadFolder(file.mimetype);
    const fullPath = path.join(UPLOAD_BASE, folderName);

    // create folder if not exists
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, fullPath);
  },

  filename(req, file, cb) {
    cb(null, `${uuid()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
});

export default upload;
