"use client";
import styles from "./LoginForm.module.scss";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/actions/auth/login";
import Button from "@/components/ui/basics/Button/Button";
import { IoInformationOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/common/routes";

const LoginForm = () => {
  const router = useRouter();
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state == "success") window.location.replace(ROUTES.ROOT);
  }, [router, state]);

  return (
    <form action={dispatch} className={styles.form_login}>
      <div className={styles.item_form}>
        <p className={styles.label}>Email</p>
        <input className={styles.input} type="email" name="email" />
      </div>
      <div className={styles.item_form}>
        <p className={styles.label}>Password</p>
        <input className={styles.input} type="password" name="password" />
      </div>

      {state == "Credential signin" && (
        <span className={styles.alert}>
          <IoInformationOutline />
          <p>Incorrect credentials</p>
        </span>
      )}

      <LoginButton />
    </form>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" style={{ width: "100%" }}>
      Enter
    </Button>
  );
};

export default LoginForm;
