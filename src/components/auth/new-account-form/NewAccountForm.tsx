"use client";
import { useForm } from "react-hook-form";
import styles from "./NewAccountForm.module.scss";
import Button from "@/components/ui/basics/Button/Button";
import { registerUser } from "@/actions/auth/register";
import { useState } from "react";
import { login } from "@/actions/auth/login";
import { ROUTES } from "@/common/routes";
import Input from "@/components/ui/basics/Input/Input";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const NewAccountForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async ({ name, email, password }: FormInputs) => {
    setErrorMessage("");
    const { ok, user, message } = await registerUser(name, email, password);
    if (!ok) return setErrorMessage(message);
    const loginResp = await login(email.toLowerCase(), password);
    if (!loginResp.ok) return setErrorMessage(loginResp.message);
    window.location.replace(ROUTES.ROOT);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_login}>
      <div className={styles.item_form}>
        <Input
          label="Full name"
          {...register("name", { required: true })}
          errorMessage={
            errors.name?.type == "required" && "The is name required"
          }
          type="text"
        />
      </div>

      <div className={styles.item_form}>
        <Input
          label="Email"
          {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
          errorMessage={
            errors.email?.type == "required" && "The is email required"
          }
          type="email"
        />
      </div>
      <div className={styles.item_form}>
        <Input
          label="Password"
          {...register("password", { required: true, minLength: 6 })}
          errorMessage={
            errors.password?.type == "required" && "The is password required"
          }
          type="password"
        />
      </div>
      <p className={styles.alert_input}>{errorMessage}</p>
      <Button style={{ width: "100%" }}>Create</Button>
    </form>
  );
};

export default NewAccountForm;
