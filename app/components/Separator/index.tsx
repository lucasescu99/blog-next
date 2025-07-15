import styles from "./Separator.module.scss";

interface SeparatorProps {
  text: string;
}

export default function Separator({ text }: SeparatorProps) {
    return (
        <div className={styles.separator}>
            <span className={styles.separatorLine} />
            <p className={styles.separatorText}>{text}</p>
            <span className={styles.separatorLine} />
        </div>
    );
}