'use client'

import { useEffect } from 'react'
import { useUserListStore } from '../_store/userListStore'
import type { CommonProps } from '@/@types/common'

const UserListProvider = ({ children }: CommonProps) => {
    const setInitialLoading = useUserListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setInitialLoading(false)
    }, [setInitialLoading])

    return <>{children}</>
}

export default UserListProvider
