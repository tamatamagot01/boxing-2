'use client'

import { useEffect } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import Loading from '@/components/ui/Loading/Loading'
import { getCustomers } from '../../service/customer/queryFns'
import CustomerListTable from './CustomerListTable'
import { useSearchParams } from 'next/navigation'
import { useCustomerListStore } from '../_store/customerListStore'

export default function CustomerListTableFetcher() {
    const searchParams = useSearchParams()
    const query = searchParams.get('query') || ''
    const pageIndex = searchParams.get('pageIndex') || '1'
    const pageSize = searchParams.get('pageSize') || '10'

    const setCustomerList = useCustomerListStore(
        (state) => state.setCustomerList,
    )

    const params = { query, pageIndex, pageSize }

    const { data, isPending, error } = useQuery({
        queryKey: ['customers', params],
        queryFn: () => getCustomers(params),
        placeholderData: keepPreviousData,
    })

    useEffect(() => {
        if (data?.customers?.customers) {
            setCustomerList(data.customers.customers)
        }
    }, [data, setCustomerList])

    if (isPending) return <Loading />
    if (error) {
        return (
            <p className="text-red-500">
                Error:{' '}
                {(error as any).response?.data?.error ||
                    (error as Error).message}
            </p>
        )
    }

    return (
        <CustomerListTable
            customerListTotal={data.customers.count}
            pageIndex={parseInt(pageIndex)}
            pageSize={parseInt(pageSize)}
        />
    )
}
