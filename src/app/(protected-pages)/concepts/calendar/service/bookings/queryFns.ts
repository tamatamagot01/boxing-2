import axiosClient from '@/services/axiosClient'

interface BookingQueryParams {
    query?: string
    pageIndex: string
    pageSize: string
}

export const getBookings = async () => {
    const res = await axiosClient.get('/booking/get-bookings')
    return res.data
}

export const getBooking = async (bookingID: number) => {
    const res = await axiosClient.get('/booking/get-booking', {
        params: { bookingID },
    })

    return res.data
}

export const getBookingCalendar = async () => {
    const res = await axiosClient.get('/booking/get-booking-calendar')
    return res.data
}

export const getTimeLists = async () => {
    const res = await axiosClient.get('/time/get-all')
    return res.data
}

export const getThisDayCustomer = async (bookingDate: string) => {
    const res = await axiosClient.get('/booking/get-today-customer', {
        params: { bookingDate },
    })
    return res.data
}
