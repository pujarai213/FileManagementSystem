import { Folder } from "../schema/model.js";

export const createFolder = async (req, res) => {
  const folder = await Folder.create({
    name: req.body.name,
    ownerId: req.user.id,
    parentFolder: req.body.parentFolder || null,
  });

  res.status(201).json(folder);
};

export const renameFolder = async (req, res) => {
  const folder = await Folder.findOneAndUpdate(
    { _id: req.params.id, ownerId: req.user.id },
    { name: req.body.name },
    { new: true }
  );

  if (!folder) return res.status(404).json({ message: "Folder not found" });

  res.json(folder);
};

export const deleteFolder = async (req, res) => {
  await Folder.deleteOne({ _id: req.params.id, ownerId: req.user.id });

  // Optional: move files to root or delete them
  await File.updateMany({ folder: req.params.id }, { folder: null });

  res.json({ message: "Folder deleted" });
};

export const listFolders = async (req, res) => {
  const folders = await Folder.find({ ownerId: req.user.id });
  res.json(folders);
};
