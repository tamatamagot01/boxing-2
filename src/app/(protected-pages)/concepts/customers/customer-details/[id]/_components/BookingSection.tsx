'use client'

import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'
import { BookingDetailsProps } from './CustomerDetails'
import Link from 'next/link'
import { capitalizeString } from '@/utils/capitalizeString'

const { Tr, Td, TBody } = Table

const statusColor: Record<string, string> = {
    paid: 'bg-emerald-500',
    pending: 'bg-amber-400',
}

type BookingProps = {
    id: number
    bookingID: string
    bookingDate: string
    time: { time: string }
    classType: string
    participant: number
    trainer?: { first_name: string; last_name: string }
    createdAt: string
}

const columnHelper = createColumnHelper<BookingProps>()

const columns = [
    columnHelper.accessor('bookingID', {
        header: 'Booking ID',
        cell: (props) => {
            const row = props.row.original
            return (
                <Link
                    className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                    href={`/concepts/bookings/booking-details/${row.id}`}
                >
                    #{row.bookingID}
                </Link>
            )
        },
    }),
    columnHelper.accessor('classType', {
        header: 'Class Type',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="font-semibold">
                        {capitalizeString(row.classType)}
                    </span>
                </div>
            )
        },
    }),
    columnHelper.accessor('bookingDate', {
        header: 'Date',
        cell: (props) => {
            const row = props.row.original
            const formattedDate = dayjs(row.bookingDate).format('DD/MM/YYYY')

            return (
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{formattedDate}</span>
                </div>
            )
        },
    }),
    columnHelper.accessor('time.time', {
        header: 'Time',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center gap-2">
                    <Badge className={statusColor['paid']} />
                    <span className="heading-text font-bold capitalize">
                        {row.time.time}
                    </span>
                </div>
            )
        },
    }),
]

const BookingSection = ({ data }: { data: BookingDetailsProps }) => {
    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <>
            <h6 className="mb-4">Booking history</h6>
            {data.length === 0 ? (
                <div>No data</div>
            ) : (
                <Table>
                    <TBody>
                        {table
                            .getRowModel()
                            .rows.slice(0, 10)
                            .map((row) => {
                                return (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <Td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                </Td>
                                            )
                                        })}
                                    </Tr>
                                )
                            })}
                    </TBody>
                </Table>
            )}
        </>
    )
}

export default BookingSection
