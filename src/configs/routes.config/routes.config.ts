import dashboardsRoute from './dashboardsRoute'
import conceptsRoute from './conceptsRoute'
import authRoute from './authRoute'

import type { Routes } from '@/@types/routes'

export const protectedRoutes: Routes = {
    ...dashboardsRoute,
    ...conceptsRoute,
}

export const publicRoutes: Routes = {
    '/landing': {
        key: 'landing',
        authority: [],
    },
}

export const authRoutes = authRoute
