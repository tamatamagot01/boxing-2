'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import TrainerListSearch from './TrainerListSearch'

const TrainersListTableTools = () => {
    const { onAppendQueryParams } = useAppendQueryParams()
    const searchParams = useSearchParams()
    const queryParam = searchParams.get('query') || ''
    const [query, setQuery] = useState(queryParam)

    // sync ค่าเมื่อเปลี่ยนจากภายนอก (เช่น filter หรือ refresh)
    useEffect(() => {
        setQuery(queryParam)
    }, [queryParam])

    const handleInputChange = (value: string) => {
        setQuery(value)
        onAppendQueryParams({ query: value })
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <TrainerListSearch
                value={query}
                onInputChange={handleInputChange}
            />
        </div>
    )
}

export default TrainersListTableTools
