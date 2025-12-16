import { z } from "zod";

export const uploadFileSchema = z.object({
  folderId: z
    .string()
    .optional()
    .refine((id) => !id || /^[a-f\d]{24}$/i.test(id), {
      message: "Invalid folder ID",
    }),
});
