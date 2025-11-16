'use client'

import { Card } from '@/components/ui'
import { capitalizeString } from '@/utils/capitalizeString'
import dayjs from 'dayjs'

type BookingProps = {
    id: number
    bookingID: string
    bookingDate: string
    time: { start: string; end: string }
    classType: string
    participant: number
}

type BookingInfoFieldProps = {
    title?: string
    value?: string
}

const BookingInfoField = ({ title, value }: BookingInfoFieldProps) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            <p className="heading-text font-bold">{value}</p>
        </div>
    )
}

const BookingSection = ({ data }: { data: BookingProps }) => {
    const { bookingID, bookingDate, time, classType, participant } = data

    const formattedDate = dayjs(bookingDate).format('DD/MM/YYYY')

    return (
        <Card>
            <h6 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                Booking Details
            </h6>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <BookingInfoField title="Booking ID" value={bookingID} />
                <BookingInfoField title="Booking Date" value={formattedDate} />
                <div>
                    <span className="font-semibold">Class Type</span>
                    <p className="heading-text font-bold">
                        {capitalizeString(classType)}
                    </p>
                </div>
                <BookingInfoField
                    title="Time"
                    value={`${time.start} - ${time.end}`}
                />
                <BookingInfoField
                    title="Participants"
                    value={String(participant)}
                />
            </div>
        </Card>
    )
}

export default BookingSection
