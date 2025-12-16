export const folderSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(50).trim(),
    parentFolder: z.string().optional(),
  }),
});
