'use client'

import { useEffect } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import Loading from '@/components/ui/Loading/Loading'
import { getUsers } from '../../service/user/queryFns'
import UserListTable from './UserListTable'
import { useSearchParams } from 'next/navigation'
import { useUserListStore } from '../_store/userListStore'

export default function UserListTableFetcher() {
    const searchParams = useSearchParams()
    const query = searchParams.get('query') || ''
    const pageIndex = searchParams.get('pageIndex') || '1'
    const pageSize = searchParams.get('pageSize') || '10'

    const setUserList = useUserListStore((state) => state.setUserList)

    const params = { query, pageIndex, pageSize }

    const { data, isPending, error } = useQuery({
        queryKey: ['users', params],
        queryFn: () => getUsers(params),
        placeholderData: keepPreviousData,
    })

    useEffect(() => {
        if (data?.users?.users) {
            setUserList(data.users.users)
        }
    }, [data, setUserList])

    if (isPending) return <Loading />
    if (error) {
        return (
            <p className="text-red-500">
                Error:{' '}
                {(error as any).response?.data?.error ||
                    (error as Error).message}
            </p>
        )
    }

    return (
        <UserListTable
            userListTotal={data.users.count}
            pageIndex={parseInt(pageIndex)}
            pageSize={parseInt(pageSize)}
        />
    )
}
