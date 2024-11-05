import CredentialsProvider from "next-auth/providers/credentials";
import { connectToMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcrypt";
import NextAuth, { DefaultSession, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";

interface Creditials {
  email: string;
  password: string;
}

interface UserTypes {
  _id: string;
  id: string;
  email: string;
  password: string;
  name?: string;
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<UserTypes | null> {
        if (!credentials) {
          return null;
        }

        const { email, password }: Creditials = credentials;

        try {
          await connectToMongoDB();
          const user = (await User.findOne({ email })) as UserTypes | null;
          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }
          console.log("User: ", user);
          return user;
        } catch (err) {
          console.log("Error", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: UserTypes | NextAuthUser;
    }) {
      if (user && "_id" in user) {
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        session.user.id = token.id;
      } else {
        session.user = { id: token.id } as DefaultSession["user"];
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
