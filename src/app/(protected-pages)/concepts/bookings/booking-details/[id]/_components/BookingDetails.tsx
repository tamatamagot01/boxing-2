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
    time: { time: string }
    participant: number
    user: {
        id: number
        first_name: string
        last_name: string
        email: string
        phone: string
        img?: string
    }
    trainer: {
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
                <ProfileSection profileType="Customer" data={data.user} />
                <ProfileSection profileType="Trainer" data={data.trainer} />
            </div>
            <BookingSection data={data} />
        </div>
    )
}

export default BookingDetails
