import { GoogleProfile } from "next-auth/providers/google";
// import { axios } from 'axios';
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import prismadb from "../../../../../lib/prismadb";
import { signJwtAccessToken, signJwtRefeshToken } from "@/jwt-protected/jwt";
import { jwtDecode } from "jwt-decode";
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.sub,
          image: profile.picture,
          accessToken: profile.accessToken ?? null,
          refreshToken: profile.refreshToken ?? null,
        };
      },
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
          accessToken: profile.accessToken ?? null,
          refreshToken: profile.refreshToken ?? null,
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
        let accessToken = signJwtAccessToken({
          id: user.id,
          role: user.role,
        });
        // console.log("check acc1", accessToken);

        let refreshToken = signJwtRefeshToken({
          id: user.id,
          role: user.role,
        });

        const { password, ...other } = user;

        other.accessToken = accessToken;
        other.refreshToken = refreshToken;
        // console.log("chek user", other);

        return other;
      },
    }),
  ],
  pages: {
    signIn: "/api/auth/login",
  },
  // jwt: {
  //   maxAge: 1 * 60,
  // },
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("check token", token);
      // console.log("check token 1", user);
      // console.log("check token 2", account);
      if (user?.role === "user") {
        token = {
          ...token,
          role: user.role,
        };
        return token;
      }
      if (user?.role === "admin" && account) {
        token = {
          ...token,
          user,
          role: user.role,
          accessToken: user.accessToken as string,
          refreshToken: user.refreshToken as string,
          expiresAccessToken:
            (jwtDecode(user.accessToken as string).exp as number) * 1000,
        };
        // console.log("firts time login", token);
        return token;
      }
      if (
        token.role === "admin" &&
        Date.now() + 5000 < token.expiresAccessToken
      ) {
        // console.log("access token still valid returning token", token);

        return (token = {
          ...token,
        });
      } else if (token.role === "admin") {
        console.log("refreshing token");
        const res = await fetch(
          "http://localhost:3000/api/auth/refreshtoken",

          {
            method: "POST",
            body: JSON.stringify({
              token: token.refreshToken,
              id: token.sub,
              role: token.role,
            }),
          }
        );
        const data = await res.json();
        // console.log("hceck data", data);

        token = {
          ...token,
          user,
          accessToken: data.accessToken as string,
          refreshToken: token.refreshToken as string,
          expiresAccessToken:
            (jwtDecode(data.accessToken as string).exp as number) * 1000,
        };
        // console.log("firts time login", token);
        return token;
      } else return (token = { ...token });
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.

      if (session?.user && token.role === "admin") {
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
        session.user.id = token?.user?.id || "";
        return (session = {
          ...session,
        });
      }
      // console.log("check sess tion 1", session);
      return (session = { ...session });
    },
  },
};
