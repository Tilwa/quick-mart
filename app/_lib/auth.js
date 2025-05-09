import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "@/app/_lib/userAuthentication";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
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

        const existingUser = await getUser(user.email);

        if (!existingUser) {
          await createUser({
            email: user.email,
            name: user.name,
            image: user.image, // Include the image field
          });
        }

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        const userCrr = await getUser(session.user.email);
        if (userCrr) {
          session.user.userId = userCrr.id;
        }
        return session;
      } catch (error) {
        console.error("Session error:", error);
        return session;
      }
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
