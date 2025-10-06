'use client'

import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import { Ref } from 'react'

type CustomerListSearchProps = {
    onInputChange: (value: string) => void
    value: string
    ref?: Ref<HTMLInputElement>
}

const CustomerListSearch = ({
    onInputChange,
    ref,
    value,
}: CustomerListSearchProps) => {
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

export default CustomerListSearch
