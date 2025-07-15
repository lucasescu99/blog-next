import styles from "./Dashboard.module.scss";
import { getUsersWithArticlesCount } from "@/server/users";
import Image from "next/image";
import Link from "next/link";
import Separator from "../components/Separator";

export default async function Dashboard() {
    const users = await getUsersWithArticlesCount();
    
    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <Separator text="Autores" />
            </div>
            <div className={styles.users}>
                {users.map((user) => (
                    <Link key={user._id.toString()} href={`/autor/${user._id.toString()}`} className={styles.user}>
                        <p>{user.name} - {user.articlesCount} artículos</p>
                        <Image src="/arrow-right.png" alt="arrow-right" width={20} height={20} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
