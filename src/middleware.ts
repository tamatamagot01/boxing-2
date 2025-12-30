import NextAuth from 'next-auth'

import authConfig from '@/configs/auth.config.edge'
import {
    authRoutes as _authRoutes,
    publicRoutes as _publicRoutes,
} from '@/configs/routes.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import appConfig from '@/configs/app.config'

const { auth } = NextAuth(authConfig)

const publicRoutes = Object.entries(_publicRoutes).map(([key]) => key)
const authRoutes = Object.entries(_authRoutes).map(([key]) => key)

const apiAuthPrefix = `${appConfig.apiPrefix}/auth`

// Public API routes that don't require authentication
const publicApiPrefixes = [
    `${appConfig.apiPrefix}/time`,
    `${appConfig.apiPrefix}/booking`,
    `${appConfig.apiPrefix}/public`,
    `${appConfig.apiPrefix}/trainer`,
    `${appConfig.apiPrefix}/user`,
    // Add more public API prefixes here if needed
]

export default auth((req) => {
    // TEMPORARY: Disable all authentication
    return

    // ORIGINAL CODE - Uncomment to re-enable authentication
    // const { nextUrl } = req
    // const isSignedIn = !!req.auth

    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    // const isPublicApiRoute = publicApiPrefixes.some((prefix) =>
    //     nextUrl.pathname.startsWith(prefix),
    // )
    // const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    // const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    // if (isApiAuthRoute || isPublicApiRoute) return

    // if (isAuthRoute) {
    //     if (isSignedIn) {
    //         return Response.redirect(
    //             new URL(appConfig.authenticatedEntryPath, nextUrl),
    //         )
    //     }
    //     return
    // }

    // if (!isSignedIn && !isPublicRoute) {
    //     let callbackUrl = nextUrl.pathname
    //     if (nextUrl.search) {
    //         callbackUrl += nextUrl.search
    //     }

    //     return Response.redirect(
    //         new URL(
    //             `${appConfig.unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${callbackUrl}`,
    //             nextUrl,
    //         ),
    //     )
    // }

    /** Uncomment this and `import { protectedRoutes } from '@/configs/routes.config'` if you want to enable role based access */
    // if (isSignedIn && nextUrl.pathname !== '/access-denied') {
    //     const routeMeta = protectedRoutes[nextUrl.pathname]
    //     const includedRole = routeMeta?.authority.some((role) => req.auth?.user?.authority.includes(role))
    //     if (!includedRole) {
    //         return Response.redirect(
    //             new URL('/access-denied', nextUrl),
    //         )
    //     }
    // }
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)'],
}
