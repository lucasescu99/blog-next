"use client";
import styles from "./Login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form"
import { signIn } from "@/server/users";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<FormData>();
  
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await signIn(data.email, data.password);
  };

  return (
    <div className={styles.login}>
      <h1>Bienvenido a Blogbuster</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input type="email" placeholder="Email" {...register("email")} />
        <input type="password" placeholder="Password" {...register("password")} />
        <button type="submit">Iniciar sesión</button>
        <p>¿No tienes una cuenta? <Link href="/register">Regístrate</Link></p>  
      </form>
    </div>
  );
}