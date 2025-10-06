'use client'

import { useEffect } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import Loading from '@/components/ui/Loading/Loading'
import { useSearchParams } from 'next/navigation'
import { useBookingListStore } from '../_store/bookingListStore'
import { getBookings } from '../../service/bookings/queryFns'
import BookingListTable from './BookingListTable'

export default function BookingListTableFetcher() {
    const searchParams = useSearchParams()
    const query = searchParams.get('query') || ''
    const pageIndex = searchParams.get('pageIndex') || '1'
    const pageSize = searchParams.get('pageSize') || '10'

    const setBookingList = useBookingListStore((state) => state.setBookingList)

    const params = { query, pageIndex, pageSize }

    const { data, isPending, error } = useQuery({
        queryKey: ['bookings', params],
        queryFn: () => getBookings(params),
        placeholderData: keepPreviousData,
    })

    useEffect(() => {
        if (data?.bookings?.bookings) {
            setBookingList(data.bookings.bookings)
        }
    }, [data, setBookingList])

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
        <BookingListTable
            bookingListTotal={data.bookings.count}
            pageIndex={parseInt(pageIndex)}
            pageSize={parseInt(pageSize)}
        />
    )
}
