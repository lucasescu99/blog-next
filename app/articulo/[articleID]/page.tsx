import Separator from "@/app/components/Separator";
import styles from "./Article.module.scss";
import { getArticle } from "@/server/articles";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/server/users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Article({ params }: { params: { articleID: string } }) {
    const { articleID } = await params;
    const article = await getArticle(new ObjectId(articleID));
    if (!article) {
        return (
            <div className={styles.article}>
                <Separator text="Artículo no encontrado" />
                <Link href="/">Volver a la página principal</Link>
            </div>
        );  
    }
    const session = await auth.api.getSession({
      headers: await headers()
    })
    const author = await getUser(article.author);
    const isAuthor = session?.user.id === article.author.toString();
    const createdAt = article._id.getTimestamp().toLocaleDateString();
    
    return (
        <div className={styles.article}>
            {
              isAuthor && (
                <Link href={`/articulo/${articleID}/editar`} className={styles.articleEdit}>
                  Editar
                </Link>
              )
            }
            <Image src={article.image || "/defaultdoc.png"} alt={article.title} width={400} height={400} />
            <h2 className={styles.articleAuthor}>{author.name} - {createdAt}</h2>
            <div className={styles.articleContent}>
                <h1>{article.title}</h1>
                <span className={styles.articleSeparator} />
                <p>{article.text}</p>
            </div>
        </div>
    );
}