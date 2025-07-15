"use client";
import styles from "./Search.module.scss";
import { findArticles } from "@/server/articles";
import { useState } from "react";
import { ArticleToClient } from "@/interfaces/articles";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";

export default function Search() {
    const [articles, setArticles] = useState<ArticleToClient[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [isSearch, setIsSearch] = useState(false);
    
    const handleSearch = async (data: FieldValues) => {
        setIsLoading(true);
        const query = data.search.trim();
        const articles = await findArticles(query);
        setArticles(articles);
        setIsLoading(false);
        setIsSearch(true);
    }

    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit(handleSearch)} className={styles.form}>
                <input type="text" placeholder="Buscar" {...register("search")} />
                <button type="submit">Buscar</button>
            </form>
            <div className={styles.results}>
                    {isLoading ? <p>Cargando...</p> : isSearch ? articles.map((article) => (
                    <Link href={`/articulo/${article._id.toString()}`} key={article._id.toString()}>
                        <p>{article.title}</p>
                    </Link>)) : null}
                    {isSearch && articles.length === 0 && <p>No se encontraron resultados</p>}
            </div>
        </div>
    );  
}