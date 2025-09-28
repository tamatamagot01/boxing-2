import { DatePicker, Input, Select } from '@/components/ui'
import { useClassTypeStore } from '../../store/clientStore'
import { headerLists } from '../../store/headerStore'

export default function ClassTime({}) {
    const header = headerLists[1]

    const today = new Date()

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
                            onChange={(e) => console.log('e', e, typeof e)}
                            minDate={today}
                        />
                    </>

                    <>
                        <label className="font-bold">Time</label>
                        <Select
                            placeholder="Select time"
                            options={[
                                { label: '1', value: 1 },
                                { label: '2', value: 2 },
                                { label: '3', value: 3 },
                            ]}
                            onChange={(e) => console.log(e?.value || 0)}
                        />
                    </>
                </div>

                <hr className="my-4" />

                <>
                    <label className="font-bold">Participants</label>
                    <Input className="mt-2" type="number" min={1} />
                    <p className="text-error mt-1">
                        No available spots for this time
                    </p>
                    <p className="text-success mt-1">
                        Available spots : <span>1</span>
                    </p>
                </>
            </div>
        </>
    )
}
