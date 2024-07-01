import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: Date;
      role: string;
      image?: string;
    } & DefaultSession["user"];
  }
}
