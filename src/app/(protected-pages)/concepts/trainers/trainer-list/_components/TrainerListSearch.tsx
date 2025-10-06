'use client'

import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import { Ref } from 'react'

type TrainerListSearchProps = {
    onInputChange: (value: string) => void
    value: string
    ref?: Ref<HTMLInputElement>
}

const TrainerListSearch = ({
    onInputChange,
    ref,
    value,
}: TrainerListSearchProps) => {
    return (
        <DebouceInput
            ref={ref}
            placeholder="Quick search..."
            suffix={<TbSearch className="text-lg" />}
            value={value}
            onChange={(e) => onInputChange(e.target.value)}
        />
    )
}

export default TrainerListSearch
