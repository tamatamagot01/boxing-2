'use client'

import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { useTrainerListStore } from '../_store/trainerListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TbPencil, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import type { Trainer } from '../types'
import { capitalizeString } from '@/utils/capitalizeString'

type TrainerListTableProps = {
    trainerListTotal: number
    pageIndex?: number
    pageSize?: number
}

const NameColumn = ({ row }: { row: Trainer }) => {
    return (
        <div className="flex items-center">
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                href={`/concepts/trainers/trainer-details/${row.id}`}
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

const TrainerListTable = ({
    trainerListTotal,
    pageIndex = 1,
    pageSize = 10,
}: TrainerListTableProps) => {
    const router = useRouter()

    const trainerList = useTrainerListStore((state) => state.trainerList)

    const isInitialLoading = useTrainerListStore(
        (state) => state.initialLoading,
    )

    const { onAppendQueryParams } = useAppendQueryParams()

    const handleEdit = (trainer: Trainer) => {
        router.push(`/concepts/trainers/trainer-edit/${trainer.id}`)
    }

    const handleViewDetails = (trainer: Trainer) => {
        router.push(`/concepts/trainers/trainer-details/${trainer.id}`)
    }

    const columns: ColumnDef<Trainer>[] = useMemo(
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
            data={trainerList}
            noData={trainerList.length === 0}
            loading={isInitialLoading}
            pagingData={{
                total: trainerListTotal,
                pageIndex,
                pageSize,
            }}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default TrainerListTable
