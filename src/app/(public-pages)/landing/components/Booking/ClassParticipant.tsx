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

export default function ClassParticipant({}) {
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
                className={`mt-2 ${!currentAvailable && 'opacity-40'}`}
                placeholder="Number of participants"
                type="number"
                value={
                    participant > currentAvailable
                        ? currentAvailable
                        : participant
                }
                disabled={!currentAvailable}
                onChange={(e) => setParticipant(Number(e.target.value))}
                min={1}
                max={currentAvailable}
            />
            {currentAvailable ? (
                <p className="text-success mt-1.5">
                    Available spots : <span>{currentAvailable}</span>
                </p>
            ) : (
                <p className="text-error mt-1.5">
                    No available spots for this time
                </p>
            )}
        </>
    )
}
