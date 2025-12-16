import fs from "fs";

export const validateFileSignature = (filePath, mimeType) => {
  const buffer = Buffer.alloc(4);
  const fd = fs.openSync(filePath, "r");
  fs.readSync(fd, buffer, 0, 4, 0);
  fs.closeSync(fd);

  const signatures = {
    "image/jpeg": ["ffd8ffe0", "ffd8ffe1"],
    "image/png": ["89504e47"],
    "application/pdf": ["25504446"],
  };

  const hex = buffer.toString("hex");

  return signatures[mimeType]?.some((sig) => hex.startsWith(sig));
};
