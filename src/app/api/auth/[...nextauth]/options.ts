import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) {
          throw new Error("email and password both are required.");
        }
        await connectDB();
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("User does not exist.");
        }
        const isValid = bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid password credential.");
        }
        const userData = {
          id: user._id.toString(),
          username: user.username,
          isVerified: user.isVerified,
          isAcceptingMessage: user.isAcceptingMessage,
        };
        return userData;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessage;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token.id;
        session.user.isAcceptingMessage = token.isAcceptingMessage;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
};
