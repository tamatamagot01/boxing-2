'use client'

import { Input } from '@/components/ui'
import {
    useClassDateStore,
    useClassParticipantStore,
    useClassTypeStore,
} from '../../store/clientStore'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/ui/Loading/Loading'
import { useEffect } from 'react'
import { getThisDayCustomer } from '../../service/booking/queryFns'

type ClassParticipantProps = {
    onLoadingChange?: (isLoading: boolean) => void
}

export default function ClassParticipant({
    onLoadingChange,
}: ClassParticipantProps) {
    const { classType } = useClassTypeStore()
    const { date, timeID } = useClassDateStore()
    const {
        maxGroupParticipant,
        maxPrivateParticipant,
        participant,
        setParticipant,
        currentAvailable,
        setCurrentAvailable,
    } = useClassParticipantStore()

    if (!classType || !date || !timeID) {
        return <p>Please select date and time first</p>
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['bookings', classType, date, timeID],
        queryFn: () => getThisDayCustomer(classType!, date, timeID),
        enabled: !!date && !!timeID,
    })

    const thisDayCustomer = data?.bookings._sum.participant ?? 0

    // Notify parent about loading state
    useEffect(() => {
        onLoadingChange?.(isPending)
    }, [isPending, onLoadingChange])

    useEffect(() => {
        if (classType === 'private') {
            setCurrentAvailable(maxPrivateParticipant - thisDayCustomer)
        }

        if (classType === 'group') {
            setCurrentAvailable(maxGroupParticipant - thisDayCustomer)
        }
    }, [thisDayCustomer, classType, date, timeID])

    if (isPending) return <Loading />

    if (error) {
        return (
            'An error has occurred: ' +
            ((error as any).response?.data?.error || (error as Error).message)
        )
    }

    return (
        <>
            <label className="font-bold">Participants</label>
            <Input
                className={`mt-2 ${!currentAvailable && 'opacity-40'} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                placeholder="Number of participants"
                type="number"
                value={participant || ''}
                disabled={!currentAvailable}
                onChange={(e) => {
                    const value = e.target.value
                    // If empty, set to 0 temporarily
                    if (value === '' || value === '0') {
                        setParticipant(0)
                        return
                    }

                    const numValue = parseInt(value, 10)

                    // Ignore if NaN or less than 1
                    if (isNaN(numValue) || numValue < 1) {
                        return
                    }

                    // Cap at currentAvailable
                    if (numValue > currentAvailable) {
                        setParticipant(currentAvailable)
                    } else {
                        setParticipant(numValue)
                    }
                }}
                onBlur={() => {
                    // If still 0 after blur, set to 1
                    if (participant === 0 && currentAvailable > 0) {
                        setParticipant(1)
                    }
                }}
                min={1}
                max={currentAvailable}
            />
            {currentAvailable ? (
                <p className="text-success dark:text-green-400 mt-1.5">
                    Available spots : <span>{currentAvailable}</span>
                </p>
            ) : (
                <p className="text-error dark:text-red-400 mt-1.5">
                    No available spots for this time
                </p>
            )}
        </>
    )
}
