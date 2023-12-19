import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { encode } from "next-auth/jwt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { name,id, email, token } = credentials;
        console.log(name, email, id, token, "these are the values from the token")

        try {
          const user = {
            name, 
            email,
            _id: id, 
            token
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // If a user is signing in, update the token with user information
        token.id = user.id;
        token.email = user.email;

        // Add the encoded token to the token object
        token.encodedToken = user.token || null;
      }
      return token;
    },
    async session({ session, token }) {
      // If a session is being created, add the user information to the session
      if (session) {
        session.user = {
          name: session.user.name,
          email: session.user.email,
          token: token.encodedToken
        };
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
