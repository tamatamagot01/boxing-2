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
