import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        if (
          username !== process.env.ADMIN_USERNAME ||
          !process.env.ADMIN_PASSWORD_HASH
        ) {
          return null;
        }

        const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
        if (!valid) return null;

        return { id: "1", name: username };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
});
