import { DatePicker, Input, Select } from '@/components/ui'
import {
    useClassDateStore,
    useClassParticipantStore,
    useClassTypeStore,
} from '../../store/clientStore'
import { headerLists } from '../../store/headerStore'
import { useQuery } from '@tanstack/react-query'
import ClassParticipant from './ClassParticipant'
import { TimeListType } from '@/@types/common'
import dayjs from 'dayjs'
import Loading from '@/components/ui/Loading/Loading'
import { getClassTime } from '../../service/time/queryFns'
import { useEffect } from 'react'

type TimeOption = {
    label: string
    value: number
}

type ClassTimeProps = {
    onLoadingChange?: (isLoading: boolean) => void
}

export default function ClassTime({ onLoadingChange }: ClassTimeProps) {
    const header = headerLists[1]

    const today = new Date()

    const { classType } = useClassTypeStore()

    const { date, setDate, timeID, setTime, timeLabel, setTimeLabel } =
        useClassDateStore()

    const { participant } = useClassParticipantStore()

    const { isPending, error, data } = useQuery({
        queryKey: ['times', classType],
        queryFn: () => getClassTime(classType),
        enabled: !!classType,
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

            {/* Booking Summary Card */}
            <div className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Booking Summary
                </h6>
                <div className="space-y-2">
                    {classType && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                Class Type
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs font-semibold">
                                {classType.charAt(0).toUpperCase() +
                                    classType.slice(1)}
                            </span>
                        </div>
                    )}

                    {date && timeLabel && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                Date & Time
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-semibold">
                                {date.split('-').reverse().join('/')} at{' '}
                                {timeLabel}
                            </span>
                        </div>
                    )}

                    {date && timeID && participant && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                Participants
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500 text-white text-xs font-semibold">
                                {participant}{' '}
                                {participant > 1 ? 'people' : 'person'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

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
                        ) => {
                            setTime(option?.value || null)
                            setTimeLabel(option?.label || null)
                        }}
                    />
                </>
            </div>

            <hr className="my-4" />

            {date && timeID && (
                <ClassParticipant onLoadingChange={onLoadingChange} />
            )}
        </div>
    )
}
