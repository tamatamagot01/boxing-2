'use client'

import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import CustomerListProvider from './_components/CustomerListProvider'
import CustomerListTable from './_components/CustomerListTable'
import CustomerListActionTools from './_components/CustomerListActionTools'
import CustomersListTableTools from './_components/CustomersListTableTools'
import CustomerListSelected from './_components/CustomerListSelected'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/ui/Loading/Loading'
import { getCustomers } from '../service/customer/queryFns'
import { useSearchParams } from 'next/navigation'

export default function Page() {
    const searchParams = useSearchParams()

    const params = {
        pageIndex: searchParams.get('pageIndex') || '1',
        pageSize: searchParams.get('pageSize') || '10',
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['customers'],
        queryFn: getCustomers,
    })

    if (isPending) return <Loading />

    if (error) {
        return (
            'An error has occurred: ' +
            ((error as any).response?.data?.error || (error as Error).message)
        )
    }

    return (
        <CustomerListProvider customerList={data.customers.customers}>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Customers</h3>
                            <CustomerListActionTools />
                        </div>
                        <CustomersListTableTools />
                        <CustomerListTable
                            customerListTotal={data.customers.count}
                            pageIndex={
                                parseInt(params.pageIndex as string) || 1
                            }
                            pageSize={parseInt(params.pageSize as string) || 10}
                        />
                    </div>
                </AdaptiveCard>
            </Container>
            <CustomerListSelected />
        </CustomerListProvider>
    )
}
