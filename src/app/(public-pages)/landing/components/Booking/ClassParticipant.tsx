import { Input } from '@/components/ui'
import {
    useClassDateStore,
    useClassParticipantStore,
    useClassTypeStore,
} from '../../store/clientStore'
import { useQuery } from '@tanstack/react-query'
import { getThisDayCustomer } from '@/utils/query/booking/queryFns'

export default function ClassParticipant({}) {
    const { classType } = useClassTypeStore()
    const { date, timeID } = useClassDateStore()
    const { maxGroupParticipant, maxPrivateParticipant } =
        useClassParticipantStore()

    if (!classType || !date || !timeID) {
        return <p>Please select date and time first</p>
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['bookings', classType, date, timeID],
        queryFn: () => getThisDayCustomer(classType, date, timeID),
        enabled: !!date && !!timeID,
    })

    if (isPending) return 'Loading...'

    if (error) {
        return (
            'An error has occurred: ' +
            ((error as any).response?.data?.error || (error as Error).message)
        )
    }

    const thisDayCustomer = data?.bookings._sum.participant ?? 0
    const currentAvailable =
        classType === 'group'
            ? maxGroupParticipant - thisDayCustomer
            : maxPrivateParticipant - thisDayCustomer

    return (
        <>
            <label className="font-bold">Participants</label>
            <Input className="mt-2" type="number" min={1} />
            <p className="text-error mt-1">No available spots for this time</p>
            <p className="text-success mt-1">
                Available spots : <span>{currentAvailable}</span>
            </p>
        </>
    )
}
