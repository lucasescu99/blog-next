import styles from "./Search.module.scss";

export default function Search() {
    return (
        <div className={styles.search}>
            <input type="text" placeholder="Buscar" />
        </div>
    );
}