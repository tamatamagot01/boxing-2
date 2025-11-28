import React from 'react'
import { headerLists } from '../../store/headerStore'
import {
    useClassDateStore,
    useClassParticipantStore,
    useClassTypeStore,
} from '../../store/clientStore'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/ui/Loading/Loading'
import { capitalizeString } from '@/utils/capitalizeString'
import { getConfirmBookingDetail } from '../../service/booking/queryFns'
import { useEffect } from 'react'

type BookingConfirmationType = {
    getUserData: () => {
        first_name: string
        last_name: string
        email: string
        phone: string
    }
    onLoadingChange?: (isLoading: boolean) => void
}

export default function BookingConfirmation({
    getUserData,
    onLoadingChange,
}: BookingConfirmationType) {
    const header = headerLists[3]

    const userData = getUserData()

    // bookingStore
    const { classType } = useClassTypeStore()
    const { date, timeID } = useClassDateStore()
    const { participant } = useClassParticipantStore()

    const { isPending, error, data } = useQuery({
        queryKey: ['result'],
        queryFn: () => getConfirmBookingDetail(timeID!),
    })

    // Notify parent about loading state
    useEffect(() => {
        onLoadingChange?.(isPending)
    }, [isPending, onLoadingChange])

    if (isPending) return <Loading />

    if (error) {
        return (
            'An error has occurred: ' +
            ((error as any).response?.data?.error || (error as Error).message)
        )
    }

    return (
        <div className="px-6 max-w-lg mx-auto">
            <h4 className="mb-2">Book a class</h4>
            <h6>{header.name}</h6>
            <hr className="my-4" />

            <div className="mb-4">
                <h5 className="text-lg font-bold mb-3 border-b border-gray-200 dark:border-gray-700 pb-1 text-success dark:text-green-400">
                    Your Information
                </h5>

                <div className="space-y-1">
                    <DetailRow
                        title="Full Name"
                        value={`${capitalizeString(userData.first_name)} ${capitalizeString(userData.last_name)}`}
                    />
                    <DetailRow title="Email" value={userData.email} />
                    <DetailRow title="Phone" value={userData.phone} />
                </div>

                <h5 className="text-lg font-bold my-3 border-b border-gray-200 dark:border-gray-700 pb-1 text-success dark:text-green-400">
                    Class Details
                </h5>

                <div className="space-y-1">
                    <DetailRow
                        title="Class Type"
                        value={capitalizeString(classType!) ?? 'N/A'}
                    />
                    <DetailRow
                        title="Time & Date"
                        value={`${date} @ ${data.time.start} - ${data.time.end}`}
                    />
                    <DetailRow title="Participants" value={participant} />
                    {data.trainer && (
                        <DetailRow
                            title="Instructor"
                            value={`${capitalizeString(data.trainer?.first_name) ?? 'Unassigned'} ${capitalizeString(data.trainer?.last_name) ?? ''}`}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

const DetailRow = ({
    title,
    value,
}: {
    title: string
    value: string | number
}) => (
    <div className="flex justify-between py-1 text-gray-700 dark:text-gray-300">
        <div className="font-medium text-gray-500 dark:text-gray-400">
            {title}
        </div>
        <div className="font-semibold text-right text-gray-300 dark:text-gray-200">
            {value}
        </div>
    </div>
)
