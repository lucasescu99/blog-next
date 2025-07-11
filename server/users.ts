"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";

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