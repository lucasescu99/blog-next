import { getUserArticles } from "@/server/articles";
import styles from "./Autor.module.scss";
import Link from "next/link";
import { ObjectId } from "mongodb";
import Separator from "@/app/components/Separator";
import Pagination from "@/app/components/Pagination";
import Image from "next/image";

type AutorProps = {
    params: Promise<{
        autorId: string;
    }>
} 

export default async function Autor({ params }: AutorProps) {
    const { autorId } = await params;
    const articles = await getUserArticles(new ObjectId(autorId));

    return (
        <div className={styles.autor}>
            <Separator text="Artículos" />
            <div className={styles.articles}> 
                <Pagination components={articles.map((article) => (
                    <div key={article._id.toString()} className={styles.article}>
                        <Image src={article.image || "/defaultdoc.png"} alt={article.title} width={100} height={100} />
                        <div className={styles.articleContent}>
                            <Link href={`/articulo/${article._id.toString()}`} className={styles.articleTitle}>
                                <h2>{article.title}</h2>
                            </Link>
                            <p>{article.text}</p>
                        </div>
                    </div>
                ))} maxItems={4} />
            </div>
        </div>
    );
}