'use client'

import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { useUserListStore } from '../_store/userListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TbPencil, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import type { User } from '../types'
import { capitalizeString } from '@/utils/capitalizeString'

type UserListTableProps = {
    userListTotal: number
    pageIndex?: number
    pageSize?: number
}

const NameColumn = ({ row }: { row: User }) => {
    return (
        <div className="flex items-center">
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                href={`/concepts/users/user-details/${row.id}`}
            >
                {capitalizeString(row.first_name)}{' '}
                {capitalizeString(row.last_name)}
            </Link>
        </div>
    )
}

const ActionColumn = ({
    onEdit,
    onViewDetail,
}: {
    onEdit: () => void
    onViewDetail: () => void
}) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="View">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye />
                </div>
            </Tooltip>
        </div>
    )
}

const UserListTable = ({
    userListTotal,
    pageIndex = 1,
    pageSize = 10,
}: UserListTableProps) => {
    const router = useRouter()

    const userList = useUserListStore((state) => state.userList)

    const isInitialLoading = useUserListStore((state) => state.initialLoading)

    const { onAppendQueryParams } = useAppendQueryParams()

    const handleEdit = (user: User) => {
        router.push(`/concepts/users/user-edit/${user.id}`)
    }

    const handleViewDetails = (user: User) => {
        router.push(`/concepts/users/user-details/${user.id}`)
    }

    const columns: ColumnDef<User>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Phone',
                accessorKey: 'phone',
            },
            {
                header: 'Role',
                accessorKey: 'role',
                cell: (props) => {
                    const isAdmin = props.row.original.is_backOffice
                    const isTrainer = props.row.original.is_trainer

                    const role = isAdmin
                        ? 'Admin'
                        : isTrainer
                          ? 'Trainer'
                          : 'User'

                    return <span>{role}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onViewDetail={() =>
                            handleViewDetails(props.row.original)
                        }
                    />
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handlePaginationChange = (page: number) => {
        onAppendQueryParams({
            pageIndex: String(page),
        })
    }

    const handleSelectChange = (value: number) => {
        onAppendQueryParams({
            pageSize: String(value),
            pageIndex: '1',
        })
    }

    const handleSort = (sort: OnSortParam) => {
        onAppendQueryParams({
            order: sort.order,
            sortKey: sort.key,
        })
    }

    return (
        <DataTable
            columns={columns}
            data={userList}
            noData={userList.length === 0}
            loading={isInitialLoading}
            pagingData={{
                total: userListTotal,
                pageIndex,
                pageSize,
            }}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default UserListTable
