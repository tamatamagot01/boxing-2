'use client'

import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import ProfileSection from './ProfileSection'
import BookingSection from './BookingSection'

export type CustomerDetailsProps = {
    data: {
        id: number
        first_name: string
        last_name: string
        email: string
        phone: string
        img?: string
        bookingsAsUser: BookingDetailsProps
    }
}

export type BookingDetailsProps = {
    id: number
    bookingID: string
    bookingDate: string
    time: { time: string }
    classType: string
    participant: number
    trainer?: { first_name: string; last_name: string }
    createdAt: string
}[]

const { TabNav, TabList, TabContent } = Tabs

const CustomerDetails = ({ data }: CustomerDetailsProps) => {
    return (
        <div className="flex flex-col xl:flex-row gap-4">
            <div className="min-w-[330px] 2xl:min-w-[400px]">
                <ProfileSection data={data} />
            </div>
            <Card className="w-full">
                <Tabs defaultValue="booking">
                    <TabList>
                        <TabNav value="booking">Booking</TabNav>
                    </TabList>
                    <div className="p-4">
                        <TabContent value="booking">
                            <BookingSection data={data.bookingsAsUser} />
                        </TabContent>
                    </div>
                </Tabs>
            </Card>
        </div>
    )
}

export default CustomerDetails
