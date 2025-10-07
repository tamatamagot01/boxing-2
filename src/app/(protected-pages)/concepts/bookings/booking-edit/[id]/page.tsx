'use client'

import NoUserFound from '@/assets/svg/NoUserFound'
import { useQuery } from '@tanstack/react-query'
import isEmpty from 'lodash/isEmpty'
import { useParams } from 'next/navigation'
import Loading from '@/components/ui/Loading/Loading'
import { getBooking } from '../../service/bookings/queryFns'
import BookingEdit from './_components/BookingEdit'

export default function Page() {
    const param = useParams()

    const { isPending, error, data } = useQuery({
        queryKey: ['booking', param.id],
        queryFn: () => getBooking(Number(param.id)),
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
                <h2 className="mt-4">No booking found!</h2>
            </div>
        )
    }

    return <BookingEdit data={data} />
}
