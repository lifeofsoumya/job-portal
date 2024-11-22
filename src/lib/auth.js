import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    callbacks: {
        //whenever a JWT is created or updated
        async jwt({ token, user }) {
            // If user is defined, it means it's a new login
            if (user) {
                // Find user in database
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email },
                    select: { id: true, name: true, email: true, username: true, image: true, role: true }
                });
                
                // If user exists in DB, populate token with user data
                if (dbUser) {
                    token.id = dbUser.id;
                    token.name = dbUser.name;
                    token.email = dbUser.email;
                    token.username = dbUser.username;
                    token.picture = dbUser.image;
                    token.role = dbUser.role; // Include user role
                } else {
                    const newUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            role: 'JOB_SEEKER'
                        }
                    });
                    token.id = newUser.id;
                }
            }
            return token;
        },
        //session is created or accessed
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.username = token.username; 
                session.user.picture = token.picture;
                session.user.role = token.role;
            }
            return session;
        },
        redirect() {
            return '/onboarding';
        }
    },
};

export const getAuthSession = () => getServerSession(authOptions);