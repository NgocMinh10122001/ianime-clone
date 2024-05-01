import { DefaultSession, DefaultUser, User } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      id: string;
      role: string;
      accessToken: string | null;
      refreshToken: string | null;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string;
    accessToken: string | null;
    refreshToken: string | null;
    // accessToken : string?
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    user: User;
    accessToken: string;
    expiresAccessToken: number;
    refreshToken: string;
  }
}
