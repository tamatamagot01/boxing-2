'use client'
import { useState } from 'react'
import CalendarView from '@/components/shared/CalendarView'
import Container from '@/components/shared/Container'
import EventDialog from './EventDialog'
import { useCalendar } from '../_store/calendarStore'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type { SelectedCell } from '../types'
import type {
    EventDropArg,
    EventClickArg,
    DateSelectArg,
} from '@fullcalendar/core'
import { useQuery } from '@tanstack/react-query'
import { getBookingCalendar } from '../service/bookings/queryFns'
import Loading from '@/components/ui/Loading/Loading'

const Calendar = () => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const [selectedCell, setSelectedCell] = useState<SelectedCell>({
        type: '',
    })

    const { data, isPending, error } = useQuery({
        queryKey: ['bookings'],
        queryFn: () => getBookingCalendar(),
    })

    const events = data?.bookings || []
    console.log('🚀 ~ Calendar ~ events:', events)
    const setEvents = useCalendar((state) => state.setData)

    const handleCellSelect = (event: DateSelectArg) => {
        const { start, end } = event
        setSelectedCell({
            type: 'NEW',
            start: dayjs(start).format(),
            end: dayjs(end).format(),
        })
        setDialogOpen(true)
    }

    const handleEventClick = (arg: EventClickArg) => {
        const { start, end, id, title, extendedProps } = arg.event

        setSelectedCell({
            type: 'EDIT',
            eventColor: extendedProps.eventColor,
            title,
            start: start ? dayjs(start).toISOString() : undefined,
            end: end ? dayjs(end).toISOString() : undefined,
            id,
        })
        setDialogOpen(true)
    }

    const handleEventChange = (arg: EventDropArg) => {
        const newEvents = cloneDeep(events)?.map((event: any) => {
            if (arg.event.id === event.id) {
                const { id, extendedProps, start, end, title } = arg.event
                event = {
                    id,
                    start: dayjs(start).format(),
                    end: dayjs(end).format(),
                    title,
                    eventColor: extendedProps.eventColor,
                }
            }
            return event
        })
        setEvents(newEvents)
    }

    return (
        <Container className="h-full">
            {isPending ? (
                <Loading />
            ) : (
                <CalendarView
                    editable={false}
                    selectable
                    events={events}
                    bookings={data?.bookings?.bookings}
                    eventClick={handleEventClick}
                    select={handleCellSelect}
                />
            )}
            <EventDialog
                open={dialogOpen}
                selected={selectedCell}
                onDialogOpen={setDialogOpen}
            />
        </Container>
    )
}

export default Calendar
