'use client'

import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import { HiPencil } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { capitalizeString } from '@/utils/capitalizeString'
import profileImage from '@/../public/img/avatars/thumb-1.jpg'

type ProfileType = {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    img?: string
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

const ProfileSection = ({
    data,
    profileType,
}: {
    data: ProfileType
    profileType: string
}) => {
    const router = useRouter()

    const handleEdit = () => {
        router.push(`/concepts/bookings/booking-edit/${data.id}`)
    }

    return (
        <>
            {data ? (
                <Card className="w-full">
                    <div className="flex justify-between">
                        <h5 className="font-bold opacity-50">{profileType}</h5>
                        <Tooltip title={`Edit ${profileType}`}>
                            <button
                                className="close-button button-press-feedback"
                                type="button"
                                onClick={handleEdit}
                            >
                                <HiPencil />
                            </button>
                        </Tooltip>
                    </div>
                    <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                        <div className="flex xl:flex-col items-center gap-4 mt-6">
                            <Avatar
                                size={90}
                                shape="circle"
                                src={data.img ?? profileImage.src}
                            />
                            <h4 className="font-bold">
                                {capitalizeString(data.first_name)}{' '}
                                {capitalizeString(data.last_name)}
                            </h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-10">
                            <BookingInfoField
                                title="Email"
                                value={data.email}
                            />
                            <BookingInfoField
                                title="Phone"
                                value={data.phone}
                            />
                        </div>
                    </div>
                </Card>
            ) : (
                <Card className="w-full flex justify-center items-center">
                    <h4 className="font-bold">No trainer data</h4>
                </Card>
            )}
        </>
    )
}

export default ProfileSection
