"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { articleSchema } from "@/interfaces/articles";
import { updateArticle, deleteArticle } from "@/server/articles";
import styles from "./Editar.module.scss";
import { z } from "zod";

interface EditArticleFormProps {
  article: z.infer<typeof articleSchema>;
}

export default function EditArticleForm({ article }: EditArticleFormProps) {
  const [title, setTitle] = useState(article.title);
  const [text, setText] = useState(article.text);
  const [image, setImage] = useState(article.image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const articleId = article._id.toString();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateArticle(articleId, { title, text, image });
      router.push(`/articulo/${articleId}`);
    } catch (error) {
      console.error("Error updating article:", error);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de querer eliminar este artículo?")) {
      try {
        await deleteArticle(articleId);
        router.push("/dashboard");
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  return (
    <div>
      <button className={styles.eliminar} onClick={handleDelete}>
        Eliminar artículo
      </button>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="text">Texto:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={10}
          />
        </div>
        
        <div>
          <label htmlFor="image">URL de la imagen:</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
} 