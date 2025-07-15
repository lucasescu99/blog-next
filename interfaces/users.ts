import { ObjectId } from "mongodb";
import { z } from "zod";

export const userSchema = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;