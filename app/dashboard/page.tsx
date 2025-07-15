import styles from "./Dashboard.module.scss";
import { getUsersWithArticlesCount } from "@/server/users";

export default async function Dashboard() {
    const users = await getUsersWithArticlesCount();
    
    return (
        <div className={styles.dashboard}>
            <h1>Usuarios</h1>
            <div className={styles.users}>
                {users.map((user) => (
                    <div key={user._id.toString()}>{user.name} - {user.articlesCount}</div>
                ))}
            </div>
        </div>
    );
}
