"use client";

import styles from "./Create.module.scss";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import Separator from "@/app/components/Separator";
import { useState } from "react";
import { createArticle } from "@/server/articles";
import { CreateArticle } from "@/interfaces/articles";
import { useRouter } from "next/navigation";


export default function CreateArticlePage() {
  const {useSession} = authClient;
  const {data: session} = useSession();
  const user = session?.user;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {register, handleSubmit} = useForm<CreateArticle>({
    defaultValues: {
      title: "",
      text: "",
      image: "",
    },
  });

  if (!user) {
    router.push("/");
    return;
  }

  const onSubmit = async (data: CreateArticle) => {
    setIsLoading(true);
    try {
      const articleId = await createArticle({...data, author: user.id});
      console.log(articleId);
      router.push(`/articulo/${articleId}`);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.create}>
      <Separator text="Crear artículo" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Título" {...register("title", {required: "El título es requerido"})} />
        <textarea placeholder="Texto" {...register("text", {required: "El texto es requerido"})} />
        <input type="text" placeholder="Imagen" {...register("image", {required: "La imagen es requerida"})} />
        <button type="submit" disabled={isLoading}>{isLoading ? "Creando..." : "Crear"}</button>
      </form>
    </div>
  )
}