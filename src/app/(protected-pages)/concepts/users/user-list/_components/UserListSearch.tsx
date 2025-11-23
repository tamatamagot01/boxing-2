'use client'

import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import { Ref } from 'react'

type UserListSearchProps = {
    onInputChange: (value: string) => void
    value: string
    ref?: Ref<HTMLInputElement>
}

const UserListSearch = ({ onInputChange, ref, value }: UserListSearchProps) => {
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

export default UserListSearch
