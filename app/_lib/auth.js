import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "@/app/_lib/data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
	callbacks: {
		authorized({ auth, request}) {
			return !!auth?.user;
		},
		async signIn({ user, account, profile }) {
			try {
				const existingUser = await getGuest(user.email);
				if (!existingUser) {
					await createGuest({ 
						email: user.email,
						fullName: user.name, 
					});
				}
				return true;
			} catch {
				return false;
			}
		},
		async session({ session, user }) {
			const existingUser = await getGuest(session.user.email);
			if (existingUser) {
				session.user.guestId = existingUser.id;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	}
};

export const {
  auth,
	signIn,
	signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
