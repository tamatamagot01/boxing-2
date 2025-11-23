'use client'

import UserDetails from './_components/UserDetails'
import NoUserFound from '@/assets/svg/NoUserFound'
import Loading from '@/components/ui/Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getUserAndBooking } from '../../service/user/queryFns'
import isEmpty from 'lodash/isEmpty'

export default function Page() {
    const param = useParams()

    const { isPending, error, data } = useQuery({
        queryKey: ['user', param.id],
        queryFn: () => getUserAndBooking(Number(param.id)),
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
                <h2 className="mt-4">No user found!</h2>
            </div>
        )
    }

    return <UserDetails data={data.user} />
}
