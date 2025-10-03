'use client'

import React from 'react'
import PostLoginLayout from '@/components/layouts/PostLoginLayout'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <PostLoginLayout>{children}</PostLoginLayout>
        </QueryClientProvider>
    )
}

export default Layout
