"use client";
import styles from "./Navbar.module.scss";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const {useSession, signOut} = authClient;
    const {data: session} = useSession();
    const user = session?.user;

    const handleLogout = async () => {
        await signOut();
        redirect("/");
    }

    return (
        <nav className={styles.navbar}>
            <Link href="/dashboard"><h1>Wortise - Blog</h1></Link>
            {user ? (
                <>
                    
                    <div className={styles.user}>
                        <p>{user.name}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </>
            ) : null}  
        </nav>
    )
}