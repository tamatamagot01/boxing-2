'use client'

import { usePathname } from 'next/navigation'

const BookingDetailHeader = () => {
    const pathname = usePathname()

    return <h3>Booking: {pathname.split('/').pop()}</h3>
}

export default BookingDetailHeader
