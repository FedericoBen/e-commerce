"use server";
import { signIn } from "@/auth.config";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(3)

    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "success";
  } catch (error) {
    return "Credential signin";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password, redirect: false });
    return { ok: true, message: "Well come" };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Can't log in`,
    };
  }
};
