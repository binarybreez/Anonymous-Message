import connectDB from "./lib/connectDB";
import UserModel from "./models/user.model";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions }  from "next-auth";


export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string ;
        const password = credentials?.password as string ;
        if (!email || !password) {
          throw new Error("both credentials are required.");
        }
        await connectDB();

        const user = await UserModel.findOne({ email })
        if (!user) {
          throw new Error("User does not exists.");
        }
        const isValid = await compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials.");
        }
        const userData = {
          id: user?._id.toString(),
          username: user?.username,
          email: user?.email,
          isVerified: user?.isVerified,
          isAcceptingMessage: user?.isAcceptingMessage,
        };
        return userData;
      },
    }),
  ],
  callbacks:{
    async jwt({token, user}){
      if(user){
        token.username = user.username
        token.isVerified = user.isVerified
        token.id = user.id
        token.isAcceptingMessage = user.isAcceptingMessage
      }
      return token
    },
    async session({session,token}){
      session.user.username = token.username
      session.user.isVerified = token.isVerified
      session.user.id = token.id
      session.user.isAcceptingMessage = token.isAcceptingMessage
      return session
    }
  },
  pages:{
    signIn:"/login",
  },
  secret:process.env.AUTH_SECRET
};
