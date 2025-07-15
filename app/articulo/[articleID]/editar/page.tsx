import styles from "./Editar.module.scss";
import { ObjectId } from "mongodb";
import { getArticle } from "@/server/articles";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Separator from "@/app/components/Separator";
import EditArticleForm from "./EditArticleForm";
import { z } from "zod";

export default async function Editar({ params }: { params: { articleID: string } }) {
  const { articleID } = await params;
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }

  const article = await getArticle(new ObjectId(articleID));
  
  if (!article) {
    redirect("/dashboard");
  }
  
  if (article.author.toString() !== session.user.id) {
    redirect("/dashboard");
  }

  const plainArticle = z.object({
    _id: z.instanceof(ObjectId),
    title: z.string(),
    text: z.string(),
    image: z.string(),
    author: z.instanceof(ObjectId)
  }).parse(article);

  return (
    <div className={styles.editar}>
      <Separator text="Editar artículo" />
      <EditArticleForm article={plainArticle} />
    </div>
  );
}