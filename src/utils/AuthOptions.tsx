import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // 1.a. Providers // Github, // Google --> yanche inbuild providers pn apan use karu shaktooo
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      //1.b callbacks
      async authorize(credentials) {
        // credintial Provider kadun credential bhetle jat aplyala
        // tyala apan responsibe ahe pudhe tyache kay karayche ahe te
        // callback bhetto
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email and password in options ");
        }

        try {
          // db connectioon kel
          await connectToDatabase();

          // user la find kela User => model madhun
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user Found ");
          }
          // password compare kela
          const ismatched = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!ismatched) {
            throw new Error("Invalid Password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.log("Erro occure in Login -->", error);
          throw new Error("Login failed");
        }
      },
    }),
  ],
  // 2. CallBacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // token madhe Id pass keli user.id user chi id
      }
      return token;
    },
    // nextjs by default session wr kam karte , jwt wr nahi
    // by default
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt", // jevha apan stratergy lihito tevha aplyala session bydefault milto
    // stratergy define kelyane JWT pn bhetto
    maxAge: 30 * 24 * 60 * 60,
  },

  // step last
  secret: process.env.NEXTAUTH_SECRET,
};
