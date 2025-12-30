'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Landing from './(public-pages)/landing/components/Landing'

const queryClient = new QueryClient()

const Page = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Landing />
        </QueryClientProvider>
    )
}

export default Page
