'use client'

import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { useBookingListStore } from '../_store/bookingListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TbPencil, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import type { Booking } from '../types'
import { capitalizeString } from '@/utils/capitalizeString'

type BookingListTableProps = {
    bookingListTotal: number
    pageIndex?: number
    pageSize?: number
}

const NameColumn = ({ row }: { row: Booking }) => {
    return (
        <div className="flex items-center">
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                href={`/concepts/bookings/booking-details/${row.id}`}
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

const BookingListTable = ({
    bookingListTotal,
    pageIndex = 1,
    pageSize = 10,
}: BookingListTableProps) => {
    const router = useRouter()

    const bookingList = useBookingListStore((state) => state.bookingList)

    const isInitialLoading = useBookingListStore(
        (state) => state.initialLoading,
    )

    const { onAppendQueryParams } = useAppendQueryParams()

    const handleEdit = (booking: Booking) => {
        router.push(`/concepts/bookings/booking-edit/${booking.id}`)
    }

    const handleViewDetails = (booking: Booking) => {
        router.push(`/concepts/bookings/booking-details/${booking.id}`)
    }

    const columns: ColumnDef<Booking>[] = useMemo(
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
            data={bookingList}
            noData={bookingList.length === 0}
            loading={isInitialLoading}
            pagingData={{
                total: bookingListTotal,
                pageIndex,
                pageSize,
            }}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default BookingListTable
