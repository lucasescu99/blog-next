"use client";
import { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
    components: React.ReactNode[];
    maxItems: number;
}

export default function Pagination({ components, maxItems }: PaginationProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setTotalPages(Math.ceil(components.length / maxItems));
    }, [components, maxItems]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    return (
        <>
            {components.slice((currentPage - 1) * maxItems, currentPage * maxItems).map((component) => component)}
            <div className={styles.paginationButtons}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
            </div>
        </>
    );
}