import { z } from "zod";

export const ReportPostSchema = z.object({
  postId: z.string().min(1),
  reasonId: z.string().min(1, { error: "Elige un motivo" }),
});

export type ReportPostRequest = z.infer<typeof ReportPostSchema>;
