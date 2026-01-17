import classNames from '@/utils/classNames'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarOptions } from '@fullcalendar/core'

type EventColors = Record<
    string,
    {
        bg: string
        text: string
    }
>

interface CalendarViewProps extends CalendarOptions {
    bookings: any
    wrapperClass?: string
    eventColors?: (colors: EventColors) => EventColors
}

const defaultColorList: Record<
    string,
    {
        bg: string
        text: string
    }
> = {
    red: {
        bg: 'bg-[#fbddd9]',
        text: 'text-gray-900',
    },
    orange: {
        bg: 'bg-[#ffc6ab]',
        text: 'text-gray-900',
    },
    yellow: {
        bg: 'bg-[#ffd993]',
        text: 'text-gray-900',
    },
    green: {
        bg: 'bg-[#bee9d3]',
        text: 'text-gray-900',
    },
    blue: {
        bg: 'bg-[#bce9fb]',
        text: 'text-gray-900',
    },
    purple: {
        bg: 'bg-[#ccbbfc]',
        text: 'text-gray-900',
    },
}

const CalendarView = (props: CalendarViewProps) => {
    const {
        bookings,
        wrapperClass,
        eventColors = () => defaultColorList,
        ...rest
    } = props

    return (
        <div className={classNames('calendar', wrapperClass)}>
            <FullCalendar
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'title',
                    center: '',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay prev,next',
                }}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }}
                eventContent={(arg) => {
                    const { extendedProps } = arg.event
                    const { isEnd, isStart } = arg

                    // Extract customer name from title (format: "Booking ID - Name")
                    const titleParts = arg.event.title.split(' - ')
                    const customerName =
                        titleParts.length > 1 ? titleParts[1] : arg.event.title

                    return (
                        <div
                            className={classNames(
                                'custom-calendar-event',
                                extendedProps.eventColor
                                    ? (eventColors(defaultColorList) ||
                                          defaultColorList)[
                                          extendedProps.eventColor
                                      ]?.bg
                                    : '',
                                extendedProps.eventColor
                                    ? (eventColors(defaultColorList) ||
                                          defaultColorList)[
                                          extendedProps.eventColor
                                      ]?.text
                                    : '',
                                isEnd &&
                                    !isStart &&
                                    'rounded-tl-none! rounded-bl-none! !rtl:rounded-tr-none !rtl:rounded-br-none',
                                !isEnd &&
                                    isStart &&
                                    'rounded-tr-none! rounded-br-none! !rtl:rounded-tl-none !rtl:rounded-bl-none',
                            )}
                        >
                            <div className="flex items-center gap-1.5 overflow-hidden">
                                {!(isEnd && !isStart) && (
                                    <span className="shrink-0 text-[10px] opacity-80">
                                        {arg.timeText}
                                    </span>
                                )}
                                <span className="truncate font-semibold">
                                    {customerName}
                                </span>
                            </div>
                        </div>
                    )
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                {...rest}
            />
        </div>
    )
}

export default CalendarView
