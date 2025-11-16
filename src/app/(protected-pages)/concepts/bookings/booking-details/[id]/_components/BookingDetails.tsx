'use client'

import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import ProfileSection from './ProfileSection'
import BookingSection from './BookingSection'

export type ProfileDetailsProps = {
    id: number
    bookingID: string
    classType: string
    bookingDate: string
    time: { start: string; end: string }
    participant: number
    guestFirstName?: string
    guestLastName?: string
    guestEmail?: string
    guestPhone?: string
    user?: {
        id: number
        first_name: string
        last_name: string
        email: string
        phone: string
        img?: string
    }
    trainer?: {
        id: number
        first_name: string
        last_name: string
        email: string
        phone: string
        img?: string
    }
}

const { TabNav, TabList, TabContent } = Tabs

const BookingDetails = ({ data }: { data: ProfileDetailsProps }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 min-w-[330px] 2xl:min-w-[400px]">
                <ProfileSection
                    profileType="Customer"
                    data={
                        data.user ?? {
                            first_name: data.guestFirstName,
                            last_name: data.guestLastName,
                            email: data.guestEmail,
                            phone: data.guestPhone,
                        }
                    }
                />
                <ProfileSection profileType="Trainer" data={data.trainer!} />
            </div>
            <BookingSection data={data} />
        </div>
    )
}

export default BookingDetails
