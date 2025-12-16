import z from "zod";

export const fileIdSchema = z.object({
  params: z.object({
    fileId: z.string().regex(/^[a-f\d]{24}$/i),
  }),
});
