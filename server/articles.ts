"use server";

import db from "@/db/mongoDB";
import { authClient } from "@/lib/auth-client";

export async function createArticle(title: string, text: string, image: string) {
  let redirectPath = "/dashboard";
  try {
    const { data: session, error } = await authClient.getSession()

    if (!session) {
      redirectPath = "/login";
    } else {
      await db.collection("article").insertOne({ title, text, author: session.user.id, image });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getArticles() {
  try {
    const articles = await db.collection("article").find().toArray();
    return articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}