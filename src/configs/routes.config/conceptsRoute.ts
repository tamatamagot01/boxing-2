import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const conceptsRoute: Routes = {
    '/concepts/ai/chat': {
        key: 'concepts.ai.chat',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    '/concepts/ai/image': {
        key: 'concepts.ai.image',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    '/concepts/projects/scrum-board': {
        key: 'concepts.projects.scrumBoard',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    '/concepts/projects/project-list': {
        key: 'concepts.projects.projectList',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    '/concepts/projects/tasks': {
        key: 'concepts.projects.projectTasks',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    '/concepts/projects/project-details/[slug]': {
        key: 'concepts.projects.projectDetails',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
        dynamicRoute: true,
    },
    '/concepts/projects/tasks/[slug]': {
        key: 'concepts.projects.projectIssue',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
        dynamicRoute: true,
    },
    '/concepts/users/user-list': {
        key: 'concepts.users.userList',
        authority: [ADMIN, USER],
    },
    '/concepts/users/user-edit/[slug]': {
        key: 'concepts.users.userEdit',
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit user',
                description:
                    'Manage user details, purchase history, and preferences.',
                contained: true,
            },
            footer: false,
        },
        dynamicRoute: true,
    },
    '/concepts/users/user-create': {
        key: 'concepts.users.userCreate',
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Create user',
                description:
                    'Manage user details, track purchases, and update preferences easily.',
                contained: true,
            },
            footer: false,
        },
    },
    '/concepts/users/user-details/[slug]': {
        key: 'concepts.users.userDetails',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
        dynamicRoute: true,
    },
    '/concepts/products/product-list': {
        key: 'concepts.products.productList',
        authority: [ADMIN, USER],
    },
    '/concepts/products/product-edit/[slug]': {
        key: 'concepts.products.productEdit',
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit product',
                description:
                    'Quickly manage product details, stock, and availability.',
                contained: true,
            },
            footer: false,
        },
        dynamicRoute: true,
    },
    '/concepts/products/product-create': {
        key: 'concepts.products.productCreate',
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Create product',
                description:
                    'Quickly add products to your inventory. Enter key details, manage stock, and set availability.',
                contained: true,
            },
            footer: false,
        },
    },
    '/concepts/bookings/booking-list': {
        key: 'concepts.bookings.bookingList',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    '/concepts/bookings/booking-create': {
        key: 'concepts.bookings.bookingCreate',
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Create booking',
                contained: true,
                description:
                    'Create new customer bookings quickly and accurately',
            },
            footer: false,
        },
    },
    '/concepts/bookings/booking-edit/[slug]': {
        key: 'concepts.bookings.bookingEdit',
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit booking',
                contained: true,
                description: 'Manage and track bookings efficiently',
            },
            footer: false,
        },
        dynamicRoute: true,
    },
    '/concepts/bookings/booking-details/[slug]': {
        key: 'concepts.bookings.bookingDetails',
        authority: [ADMIN, USER],
        meta: {
            header: {
                contained: true,
                title: lazy(
                    () =>
                        import(
                            '@/app/(protected-pages)/concepts/bookings/booking-details/[id]/_components/BookingDetailHeader'
                        ),
                ),
                extraHeader: lazy(
                    () =>
                        import(
                            '@/app/(protected-pages)/concepts/bookings/booking-details/[id]/_components/BookingDetailHeaderExtra'
                        ),
                ),
            },
            pageContainerType: 'contained',
        },
        dynamicRoute: true,
    },
    '/concepts/account/settings': {
        key: 'concepts.account.settings',
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Settings',
            },
            pageContainerType: 'contained',
        },
    },
    '/concepts/account/activity-log': {
        key: 'concepts.account.activityLog',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    '/concepts/account/pricing': {
        key: 'concepts.account.pricing',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    '/concepts/account/roles-permissions': {
        key: 'concepts.account.rolesPermissions',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    '/concepts/help-center/support-hub': {
        key: 'concepts.helpCenter.supportHub',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            pageBackgroundType: 'plain',
        },
    },
    '/concepts/help-center/article/[slug]': {
        key: 'concepts.helpCenter.article',
        authority: [ADMIN, USER],
        dynamicRoute: true,
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    '/concepts/help-center/edit-article/[slug]': {
        key: 'concepts.helpCenter.editArticle',
        authority: [ADMIN, USER],
        dynamicRoute: true,
        meta: {
            pageBackgroundType: 'plain',
            footer: false,
        },
    },
    '/concepts/help-center/manage-article': {
        key: 'concepts.helpCenter.manageArticle',
        authority: [ADMIN, USER],
        meta: {
            pageBackgroundType: 'plain',
            footer: false,
        },
    },
    '/concepts/file-manager': {
        key: 'concepts.fileManager',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    '/concepts/calendar': {
        key: 'concepts.calendar',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    '/concepts/mail': {
        key: 'concepts.mail',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    '/concepts/chat': {
        key: 'concepts.chat',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
}

export default conceptsRoute
