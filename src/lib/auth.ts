import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL, 
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      enabled: true,
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }
  }
});
