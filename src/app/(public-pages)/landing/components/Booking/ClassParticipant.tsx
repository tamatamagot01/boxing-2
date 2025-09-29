import { Input } from '@/components/ui'
import { useClassDateStore } from '../../store/clientStore'
import { useQuery } from '@tanstack/react-query'
import { getThisDayBooking } from '@/utils/query/booking/queryFns'

export default function ClassParticipant({}) {
    const { date, timeID } = useClassDateStore()

    if (!date || !timeID) {
        return <p>Please select date and time first</p>
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['trainers'],
        queryFn: () => getThisDayBooking(date, timeID),
        enabled: !!date && !!timeID,
    })

    if (isPending) return 'Loading...'

    if (error) {
        return (
            'An error has occurred: ' +
            ((error as any).response?.data?.error || (error as Error).message)
        )
    }

    console.log(1112, data)

    return (
        <>
            <label className="font-bold">Participants</label>
            <Input className="mt-2" type="number" min={1} />
            <p className="text-error mt-1">No available spots for this time</p>
            <p className="text-success mt-1">
                Available spots : <span>1</span>
            </p>
        </>
    )
}
