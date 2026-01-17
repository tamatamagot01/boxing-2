'use client'

import Button from '@/components/ui/Button'
import { useBookingListStore } from '../_store/bookingListStore'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), {
    ssr: false,
})

const BookingListActionTools = () => {
    const router = useRouter()

    const bookingList = useBookingListStore((state) => state.bookingList)

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="solid"
                icon={<TbPlus className="text-xl" />}
                onClick={() => router.push('/concepts/bookings/booking-create')}
            >
                Add new
            </Button>
        </div>
    )
}

export default BookingListActionTools
