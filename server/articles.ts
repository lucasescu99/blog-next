"use server";

import db from "@/db/mongoDB";
import { authClient } from "@/lib/auth-client";
import { ObjectId } from "mongodb";
import { Article } from "@/interfaces/articles";
import { articleSchema } from "@/interfaces/articles";

export async function createArticle(title: string, text: string, image: string): Promise<void> {
  let redirectPath = "/dashboard";
  try {
    const { data: session } = await authClient.getSession()

    if (!session) {
      redirectPath = "/login";
    } else {
      await db.collection("article").insertOne({ title, text, author: session.user.id, image });
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear el artículo");
  }
}

export async function updateArticle(articleId: ObjectId | string, data: { title: string, text: string, image: string }): Promise<void> {
  const articleIdObjectId = new ObjectId(articleId);
  try {
    await db.collection("article").updateOne({ _id: articleIdObjectId }, { $set: data });
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar el artículo");
  }
}

export async function deleteArticle(articleId: ObjectId | string): Promise<void> {
  const articleIdObjectId = new ObjectId(articleId);
  try {
    await db.collection("article").deleteOne({ _id: articleIdObjectId });
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar el artículo");
  }
}

export async function getUserArticles(userId: ObjectId): Promise<Article[]> {
  try {
    const articles = await db.collection("article").find({ author: userId }).toArray();
    console.log(articles);
    return articles.map((article) => articleSchema.parse(article));
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los artículos");
  }
}

export async function getArticle(articleId: ObjectId): Promise<Article | null> {
  try {
    const article = await db.collection("article").findOne({ _id: articleId });

    if (!article) {
      return null;
    }

    return articleSchema.parse(article);
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el artículo");
  }
}