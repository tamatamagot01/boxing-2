'use client'

import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import BookingListActionTools from './_components/BookingListActionTools'
import BookingListTableTools from './_components/BookingListTableTools'
import BookingListProvider from './_components/BookingListProvider'
import BookingListTableFetcher from './_components/BookingListTableFetcher'

export default function Page() {
    return (
        <BookingListProvider>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Bookings</h3>
                            <BookingListActionTools />
                        </div>
                        <BookingListTableTools />
                        <BookingListTableFetcher />
                    </div>
                </AdaptiveCard>
            </Container>
        </BookingListProvider>
    )
}
