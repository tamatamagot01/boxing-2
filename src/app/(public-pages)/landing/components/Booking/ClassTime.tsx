import { DatePicker, Input, Select } from '@/components/ui'
import { useClassDateStore, useClassTypeStore } from '../../store/clientStore'
import { headerLists } from '../../store/headerStore'
import { useQuery } from '@tanstack/react-query'
import { getBookings } from '@/utils/query/booking/queryFns'
import ClassParticipant from './ClassParticipant'

export default function ClassTime({}) {
    const header = headerLists[1]

    const today = new Date()

    const { date, setDate, timeID, setTime } = useClassDateStore()

    return (
        <>
            <div className="px-6 pb-6">
                <h4 className="mb-2">Book a class</h4>
                <h6>{header.name}</h6>
                <hr className="my-4" />
                <div className="flex flex-col gap-2">
                    <>
                        <label className="font-bold">Date</label>
                        <DatePicker
                            placeholder="Select date"
                            onChange={(e) =>
                                setDate(e?.toLocaleDateString() || null)
                            }
                            minDate={today}
                        />
                    </>

                    <>
                        <label className="font-bold">Time</label>
                        <Select
                            placeholder="Select time"
                            options={[
                                { label: '10:00', value: 1 },
                                { label: '11:00', value: 2 },
                                { label: '12:00', value: 3 },
                            ]}
                            onChange={(e) => setTime(e?.value || 0)}
                        />
                    </>
                </div>

                <hr className="my-4" />

                {date && timeID && <ClassParticipant />}
            </div>
        </>
    )
}
