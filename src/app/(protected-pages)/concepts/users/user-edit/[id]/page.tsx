'use client'

import UserEdit from './_components/UserEdit'
import NoUserFound from '@/assets/svg/NoUserFound'
import { useQuery } from '@tanstack/react-query'
import isEmpty from 'lodash/isEmpty'
import { useParams } from 'next/navigation'
import Loading from '@/components/ui/Loading/Loading'
import { getUser } from '../../service/user/queryFns'

export default function Page() {
    const param = useParams()

    const { isPending, error, data } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(Number(param.id)),
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

    return <UserEdit data={data} />
}
