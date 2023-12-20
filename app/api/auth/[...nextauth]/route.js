import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { password, email } = credentials;
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/public/login`, { Email: email, Password: password });
          return { ...data.user, token: data.token };
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
        token.id = user._id;
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
