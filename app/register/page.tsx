"use client";
import styles from "./Register.module.scss";
import { useForm, SubmitHandler } from "react-hook-form"
import { signUp } from "@/server/users";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await signUp(data.email, data.password, data.name);
    
  };

  return (
    <div className={styles.register}>
      <h1>Regístrate</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input type="text" placeholder="Nombre" {...register("name")} />
        <input type="email" placeholder="Email" {...register("email")} />
        <input type="password" placeholder="Password" {...register("password")} />
        <button type="submit">Regístrate</button>
        <p>¿Ya tienes una cuenta? <Link href="/login">Inicia sesión</Link></p>
      </form>
    </div>
  );
}