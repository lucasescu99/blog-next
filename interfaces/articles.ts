import { ObjectId } from "mongodb";
import { z } from "zod";

export const articleSchema = z.object({
  _id: z.instanceof(ObjectId),
  title: z.string(),
  text: z.string(),
  image: z.string(),
  author: z.instanceof(ObjectId),
});

export type Article = z.infer<typeof articleSchema>;