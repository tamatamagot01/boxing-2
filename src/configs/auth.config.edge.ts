import type { NextAuthConfig } from 'next-auth'

// Edge-compatible auth config (no Prisma, no database operations)
export default {
    session: {
        strategy: 'jwt', // Use JWT for session
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    cookies: {
        sessionToken: {
            name:
                process.env.NODE_ENV === 'production'
                    ? '__Secure-next-auth.session-token'
                    : 'next-auth.session-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            },
        },
    },
    providers: [], // Providers are handled in the main auth.config.ts
    callbacks: {
        async jwt({ token, user }) {
            // Add user info to JWT token on sign in
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }
            return token
        },
        async session(payload) {
            /** apply extra user attributes here */
            return {
                ...payload.session,
                user: {
                    ...payload.session.user,
                    id: payload.token.sub,
                    authority: ['admin', 'user'],
                },
            }
        },
    },
} satisfies NextAuthConfig
