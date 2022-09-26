import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prismaClient from "../../../lib/prismaClient";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        profile(profile) {
          return {
            id: profile.id.toString(),
            name: profile.name || profile.login,
            email: profile.email,
            image: profile.avatar_url,
          };
        }
      }),
    ],
    pages: {
      signIn: '/signin',
    },
  
    callbacks: {
      async session({ session, token, user }) {
        //    console.log(session)
           return session
      },
    }
  }

export default NextAuth(authOptions);