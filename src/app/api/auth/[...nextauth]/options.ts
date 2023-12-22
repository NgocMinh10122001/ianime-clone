import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import prismadb from "../../../../../lib/prismadb";
import jwt from "jsonwebtoken";
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        // console.log("check creidentials", credentials);

        if (!user || !user.password) {
          throw new Error("Email not exist!");
        }

        const isCorrectPassword = await compare(
          credentials?.password as string,
          user.password
        );
        // console.log("hcek pass word", isCorrectPassword);

        if (!isCorrectPassword) {
          throw new Error("Incorrect Password!");
        }

        const accessToken = jwt.sign(
          {
            id: user.id,
            role: user.role,
          },
          process.env.JWT_ACCESS_KEY as string,
          { expiresIn: "60s" }
        );
        // console.log("check access token", accessToken);

        const { password, ...other } = user;
        other.accessToken = accessToken;
        // console.log("chek user", other);

        return other;

        // const user = { id: "42", name: "Minh@gmail.com", password: "10122001", role : "admin" }
        //  const response = await fetch("https://reqres.in/api/users/2");
        // const user = await response.json();
        // console.log("check", movies);

        // if (credentials?.email === user?.name && credentials?.password === user?.password) {
        //     return user
        // }
        // else {
        //     return null
        // }
      },
    }),
  ],
  pages: {
    signIn: "/api/auth/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("Accout", account);
      // console.log("User", user);

      // Persist the OAuth access_token and or the user id to the token right after signin

      if (user && user.role) token.role = user.role;
      // console.log("check user 1", token);

      return token;
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      console.log("check session 1", session);

      if (session?.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
};
