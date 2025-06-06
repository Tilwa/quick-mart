import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const adminEmail = "shahrukhaltaf123@gmail.com";

        // Only allow this email to sign in
        if (user.email !== adminEmail) {
          console.warn("Unauthorized email attempted to sign in:", user.email);
          return false;
        }

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/admin",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
