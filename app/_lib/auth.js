import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      // update the DB based on the login data from the provider
      try {
        const existingGuest = await getGuest(user.email);
        console.log(existingGuest);
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        //must always return a boolean
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      //adding guest data to the session data for further operations
      const guest = await getGuest(session.user.email);
      session.user.guest = guest;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
