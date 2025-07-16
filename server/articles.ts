"use server";

import db from "@/db/mongoDB";
import { ObjectId } from "mongodb";
import { Article, ArticleToClient, CreateArticle } from "@/interfaces/articles";
import { articleSchema, articleToClientSchema, createArticleSchema } from "@/interfaces/articles";

export async function createArticle(data: CreateArticle): Promise<string> {
  try {
    const userObjectId = new ObjectId(data.author);
    const dataToInsert = createArticleSchema.parse({ ...data, author: userObjectId });
    const article = await db.collection("article").insertOne(dataToInsert);
    return article.insertedId.toString();
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

export async function findArticles(query: string): Promise<ArticleToClient[]> {
  // Buscar articulos por titulo, texto o nombre de autor con un limite de 5
  try {
    const authors = await db.collection("user").find({ name: { $regex: query, $options: "i" } }).toArray();

    if (authors.length > 0) {
      const articlesByTitleText = await db.collection("article").find({ $or: [{ title: { $regex: query, $options: "i" } }, { text: { $regex: query, $options: "i" } }, { author: { $in: authors.map((author) => author._id) } }] }).limit(5).toArray();

      return articlesByTitleText.map((article) => articleToClientSchema.parse({
        _id: article._id.toString(),
        title: article.title,
        text: article.text,
        image: article.image,
        author: article.author.toString(),
      }));
    }

    const articlesByTitleText = await db.collection("article").find({ $or: [{ title: { $regex: query, $options: "i" } }, { text: { $regex: query, $options: "i" } }] }).limit(5).toArray();
    return articlesByTitleText.map((article) => articleToClientSchema.parse({
      _id: article._id.toString(),
      title: article.title,
      text: article.text,
      image: article.image,
      author: article.author.toString(),
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Error al buscar los artículos");
  }
}