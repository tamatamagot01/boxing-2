'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import { TbEye, TbEyeOff } from 'react-icons/tb'
import type { ComponentPropsWithRef } from 'react'

type PasswordInputProps = ComponentPropsWithRef<typeof Input>

const PasswordInput = (props: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="relative">
            <Input {...props} type={showPassword ? 'text' : 'password'} />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                tabIndex={-1}
            >
                {showPassword ? (
                    <TbEyeOff className="h-5 w-5" />
                ) : (
                    <TbEye className="h-5 w-5" />
                )}
            </button>
        </div>
    )
}

export default PasswordInput
