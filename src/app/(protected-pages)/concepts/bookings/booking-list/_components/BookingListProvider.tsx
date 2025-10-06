'use client'

import { useEffect } from 'react'
import type { CommonProps } from '@/@types/common'
import { useBookingListStore } from '../_store/bookingListStore'

const BookingListProvider = ({ children }: CommonProps) => {
    const setInitialLoading = useBookingListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setInitialLoading(false)
    }, [setInitialLoading])

    return <>{children}</>
}

export default BookingListProvider
