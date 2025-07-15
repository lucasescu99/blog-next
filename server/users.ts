"use server";

import db from "@/db/mongoDB";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import { User, userSchema } from "@/interfaces/users";
import { ObjectId } from "mongodb";

export async function signUp(email: string, password: string, name: string) {
  let redirectPath = "/dashboard";
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name
      }
    })
  } catch (error) {
    if (error instanceof APIError) {
      redirectPath = "/login";
    }
  } finally {
    redirect(redirectPath);
  }
}

export async function signIn(email: string, password: string) {
  let redirectPath = "/dashboard";
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password
      }
    })
  } catch (error) {
    if (error instanceof APIError) {
      redirectPath = "/login";
    }
  } finally {
    redirect(redirectPath);
  }
}

export async function getUsersWithArticlesCount() {
  try {
    const users = await db.collection("user").find().toArray() as unknown as User[];
    const usersWithArticlesCount = await Promise.all(users.map(async (user) => {
      const articlesCount = await db.collection("article").countDocuments({ author: user._id });
      return { ...user, articlesCount };
    }));
    return usersWithArticlesCount;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getUser(userId: ObjectId): Promise<User> {
  try {
    const user = await db.collection("user").findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    return userSchema.parse(user);
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el usuario");
  }
}