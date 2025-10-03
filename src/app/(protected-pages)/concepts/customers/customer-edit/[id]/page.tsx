'use client'

import CustomerEdit from './_components/CustomerEdit'
import NoUserFound from '@/assets/svg/NoUserFound'
import { useQuery } from '@tanstack/react-query'
import isEmpty from 'lodash/isEmpty'
import { useParams } from 'next/navigation'
import Loading from '@/components/ui/Loading/Loading'
import { getCustomer } from '../../service/customer/queryFns'

export default function Page() {
    const param = useParams()
    console.log('🚀 ~ Page ~ param:', param)

    const { isPending, error, data } = useQuery({
        queryKey: ['customer'],
        queryFn: () => getCustomer(Number(param.id)),
    })

    if (isPending) return <Loading />

    if (error) {
        return (
            'An error has occurred: ' +
            ((error as any).response?.data?.error || (error as Error).message)
        )
    }

    if (isEmpty(data)) {
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <NoUserFound height={280} width={280} />
                <h2 className="mt-4">No customer found!</h2>
            </div>
        )
    }

    return <CustomerEdit data={data} />
}
