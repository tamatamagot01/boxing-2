'use client'

import { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import type { SelectedCell } from '../types'
import { useQueries, useQuery } from '@tanstack/react-query'
import { getThisDayCustomer, getTimeLists } from '../service/bookings/queryFns'
import { useRouter } from 'next/navigation'

export type EventParam = {
    id: string
    title: string
    start: string
    eventColor: string
    end?: string
}

type EventDialogProps = {
    open: boolean
    selected: SelectedCell
    onDialogOpen: (open: boolean) => void
}

const EventDialog = (props: EventDialogProps) => {
    const { open, selected, onDialogOpen } = props
    const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null)
    const router = useRouter()

    // Max participants per class type
    const MAX_PARTICIPANTS = {
        group: 6,
        private: 2,
    }

    const { start } = selected

    const date = start?.split('T')[0]

    // Format date for display (e.g., "Thursday, 16 January 2026")
    const formattedDate = date
        ? new Date(date).toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          })
        : ''

    const [timeListQuery, bookingsQuery] = useQueries({
        queries: [
            {
                queryKey: ['times'],
                queryFn: () => getTimeLists(),
            },
            {
                queryKey: ['bookings', 'participants', date],
                queryFn: () => getThisDayCustomer(date!),
            },
        ],
    })

    const isPending = timeListQuery.isPending || bookingsQuery.isPending

    const participants = bookingsQuery.data?.participants || []
    const timeLists = timeListQuery.data?.times || []
    const allBookings = bookingsQuery.data?.bookings || []

    // ฟังก์ชันหาจำนวนคนจองตาม bookingTimeID
    const getParticipantCount = (bookingTimeID: number) => {
        const found = participants.find(
            (p: any) => p.bookingTimeID === bookingTimeID,
        )
        return found?._sum?.participant || 0
    }

    // ฟังก์ชันหา bookings ตาม bookingTimeID
    const getBookingsByTimeId = (bookingTimeID: number) => {
        return allBookings.filter(
            (booking: any) => booking.bookingTimeID === bookingTimeID,
        )
    }

    // จัดการการคลิกที่การ์ด
    const handleTimeClick = (timeId: number) => {
        setSelectedTimeId(selectedTimeId === timeId ? null : timeId)
    }

    const handleDialogClose = () => {
        onDialogOpen(false)
    }

    return (
        <Dialog
            isOpen={open}
            onClose={handleDialogClose}
            onRequestClose={handleDialogClose}
        >
            <div className="custom-scrollbar max-h-[80vh] w-full max-w-lg overflow-y-auto sm:max-h-[70vh]">
                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 3px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: rgba(255, 255, 255, 0.3);
                    }
                `}</style>
                {/* Header */}
                <div className="px-4 pb-3 pt-2 sm:px-6 sm:pb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-xs">
                        Schedule
                    </p>
                    <h3 className="mt-1.5 text-xl font-medium tracking-tight text-white sm:mt-2 sm:text-2xl">
                        {formattedDate}
                    </h3>
                </div>

                <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                    {isPending ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-t-white"></div>
                        </div>
                    ) : (
                        <div className="space-y-1.5 sm:space-y-2">
                            {timeLists.map((time: any) => {
                                const participantCount = getParticipantCount(
                                    time.id,
                                )

                                const isSelected = selectedTimeId === time.id
                                const bookingsForTime = getBookingsByTimeId(
                                    time.id,
                                )
                                return (
                                    <div key={time.id} className="group">
                                        <div
                                            className={`cursor-pointer rounded-lg px-3 py-3 transition-colors sm:px-4 sm:py-4 ${
                                                isSelected
                                                    ? 'bg-white/10'
                                                    : 'hover:bg-white/5'
                                            }`}
                                            onClick={() =>
                                                handleTimeClick(time.id)
                                            }
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-baseline gap-2 sm:gap-3">
                                                    <span className="text-lg font-medium tabular-nums text-white sm:text-xl">
                                                        {time.start}
                                                    </span>
                                                    <span className="text-xs font-medium text-gray-400 sm:text-sm">
                                                        → {time.end}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <span className="hidden text-sm font-medium capitalize text-gray-300 sm:inline">
                                                        {time.classType}
                                                    </span>
                                                    <div
                                                        className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold sm:gap-1.5 sm:px-2 sm:py-1 sm:text-sm ${
                                                            participantCount > 0
                                                                ? participantCount >=
                                                                  (MAX_PARTICIPANTS[
                                                                      time.classType as keyof typeof MAX_PARTICIPANTS
                                                                  ] || 6)
                                                                    ? 'bg-red-500 text-white'
                                                                    : 'bg-white text-gray-900'
                                                                : 'bg-gray-700 text-gray-400'
                                                        }`}
                                                    >
                                                        <svg
                                                            className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                        </svg>
                                                        {participantCount}/
                                                        {MAX_PARTICIPANTS[
                                                            time.classType as keyof typeof MAX_PARTICIPANTS
                                                        ] || 6}
                                                    </div>
                                                    {participantCount > 0 && (
                                                        <svg
                                                            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                                                                isSelected
                                                                    ? 'rotate-180'
                                                                    : ''
                                                            }`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 9l-7 7-7-7"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bookings List */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-out ${
                                                isSelected &&
                                                bookingsForTime.length > 0
                                                    ? 'max-h-[300px] opacity-100'
                                                    : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            <div className="ml-3 border-l-2 border-gray-600 pl-3 sm:ml-4 sm:pl-4">
                                                {bookingsForTime.map(
                                                    (booking: any) => (
                                                        <div
                                                            key={booking.id}
                                                            className="flex items-center justify-between gap-2 py-2.5 sm:py-3"
                                                        >
                                                            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-gray-900 sm:h-8 sm:w-8 sm:text-[11px]">
                                                                    {booking.guestFirstName?.charAt(
                                                                        0,
                                                                    )}
                                                                    {booking.guestLastName?.charAt(
                                                                        0,
                                                                    )}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="truncate text-xs font-semibold text-white sm:text-sm">
                                                                        {
                                                                            booking.guestFirstName
                                                                        }{' '}
                                                                        {
                                                                            booking.guestLastName
                                                                        }
                                                                    </p>
                                                                    <p className="truncate text-[10px] text-gray-400 sm:text-xs">
                                                                        {
                                                                            booking.guestEmail
                                                                        }
                                                                    </p>
                                                                    {booking.guestPhone && (
                                                                        <p className="text-[10px] text-gray-400 sm:text-xs">
                                                                            {
                                                                                booking.guestPhone
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                                                                <span className="inline-flex items-center gap-1 rounded bg-gray-700 px-1.5 py-0.5 text-[10px] font-semibold text-gray-200 sm:text-xs">
                                                                    <svg
                                                                        className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                                                        fill="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                                    </svg>
                                                                    {
                                                                        booking.participant
                                                                    }
                                                                </span>
                                                                <button
                                                                    onClick={(
                                                                        e,
                                                                    ) => {
                                                                        e.stopPropagation()
                                                                        router.push(
                                                                            `/concepts/bookings/booking-details/${booking.id}`,
                                                                        )
                                                                    }}
                                                                    className="rounded-md bg-primary/20 p-1.5 text-primary hover:bg-primary/30 transition-colors"
                                                                    title="View Details"
                                                                >
                                                                    <svg
                                                                        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                        />
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {timeLists.length === 0 && (
                                <div className="py-20 text-center">
                                    <p className="text-sm font-medium text-gray-400">
                                        No classes scheduled
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Dialog>
    )
}

export default EventDialog
