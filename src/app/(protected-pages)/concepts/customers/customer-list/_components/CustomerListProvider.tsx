'use client'

import { useEffect } from 'react'
import { useCustomerListStore } from '../_store/customerListStore'
import type { CommonProps } from '@/@types/common'

const CustomerListProvider = ({ children }: CommonProps) => {
    const setInitialLoading = useCustomerListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setInitialLoading(false)
    }, [setInitialLoading])

    return <>{children}</>
}

export default CustomerListProvider
