import { ObjectId } from "mongodb";
import { z } from "zod";

export const articleSchema = z.object({
  _id: z.instanceof(ObjectId),
  title: z.string(),
  text: z.string(),
  image: z.string(),
  author: z.instanceof(ObjectId),
});

export const articleToClientSchema = z.object({
  _id: z.string(),
  title: z.string(),
  text: z.string(),
  image: z.string(),
  author: z.string(),
});

export type Article = z.infer<typeof articleSchema>;
export type ArticleToClient = z.infer<typeof articleToClientSchema>;