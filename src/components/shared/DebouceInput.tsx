'use client'

import Input from '@/components/ui/Input'
import useDebounce from '@/utils/hooks/useDebounce'
import { useState, useEffect, ChangeEvent, Ref } from 'react'
import type { InputProps } from '@/components/ui/Input'

type DebouceInputProps = InputProps & {
    wait?: number
    ref?: Ref<HTMLInputElement>
}

const DebouceInput = (props: DebouceInputProps) => {
    const {
        wait = 500,
        ref,
        value: externalValue = '',
        onChange,
        ...rest
    } = props
    const [internalValue, setInternalValue] = useState(externalValue)

    // sync external value (จาก query params)
    useEffect(() => {
        setInternalValue(externalValue)
    }, [externalValue])

    // debounce การส่ง onChange ออกไป
    const debounceFn = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
    }, wait)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value)
        debounceFn(e)
    }

    return (
        <Input
            ref={ref}
            {...rest}
            value={internalValue}
            onChange={handleChange}
        />
    )
}

export default DebouceInput
