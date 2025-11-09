import { DatePicker, Input, Select } from '@/components/ui'
import { useClassDateStore, useClassTypeStore } from '../../store/clientStore'
import { headerLists } from '../../store/headerStore'
import { useQuery } from '@tanstack/react-query'
import ClassParticipant from './ClassParticipant'
import { TimeListType } from '@/@types/common'
import dayjs from 'dayjs'
import Loading from '@/components/ui/Loading/Loading'
import { getClassTime } from '../../service/time/queryFns'

type TimeOption = {
    label: string
    value: number
}

export default function ClassTime({}) {
    const header = headerLists[1]

    const today = new Date()

    const { classType } = useClassTypeStore()

    const { date, setDate, timeID, setTime } = useClassDateStore()

    const { isPending, error, data } = useQuery({
        queryKey: ['times', classType],
        queryFn: () => getClassTime(classType),
        enabled: !!classType,
    })

    if (isPending) return <Loading />

    if (error) {
        return (
            'An error has occurred: ' +
            ((error as any).response?.data?.error || (error as Error).message)
        )
    }

    console.log('ClassTime data:', data)

    const options: TimeOption[] =
        data?.times.map((time: TimeListType) => ({
            label: `${time.start} - ${time.end}`,
            value: time.id,
        })) ?? []

    return (
        <div className="px-6 pb-6">
            <h4 className="mb-2">Book a class</h4>
            <h6>{header.name}</h6>
            <hr className="my-4" />
            <div className="flex flex-col gap-2">
                <>
                    <label className="font-bold">Date</label>
                    <DatePicker
                        placeholder="Select date"
                        value={date ? new Date(date) : null}
                        onChange={(e) => {
                            const formattedDate = dayjs(
                                e?.toLocaleDateString(),
                            ).format('YYYY-MM-DD')

                            setDate(formattedDate || null)
                        }}
                        inputFormat="DD/MM/YYYY"
                        minDate={today}
                    />
                </>

                <>
                    <label className="font-bold">Time</label>
                    <Select
                        placeholder="Select time"
                        value={
                            options.find((opt) => opt.value === timeID) ?? null
                        }
                        options={options}
                        onChange={(
                            option: { label: string; value: number } | null,
                        ) => setTime(option?.value ?? 0)}
                    />
                </>
            </div>

            <hr className="my-4" />

            {date && timeID && <ClassParticipant />}
        </div>
    )
}
