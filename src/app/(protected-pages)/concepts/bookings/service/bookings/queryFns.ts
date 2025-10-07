import { BookingFormSchema } from '@/components/view/BookingForm'
import axiosClient from '@/services/axiosClient'

interface BookingQueryParams {
    query?: string
    pageIndex: string
    pageSize: string
}

export const getBookings = async (params: BookingQueryParams) => {
    const search = new URLSearchParams()

    search.append('pageIndex', params.pageIndex)
    search.append('pageSize', params.pageSize)

    if (params.query) {
        search.append('query', params.query)
    }

    const queryString = search.toString()

    const res = await axiosClient.get(`/booking/get-bookings?${queryString}`)
    return res.data
}

export const getBooking = async (bookingID: number) => {
    const res = await axiosClient.get('/booking/get-booking', {
        params: { bookingID },
    })

    return res.data
}

export const getBookingDetail = async (bookingID: number) => {
    const res = await axiosClient.get('/booking/get-booking-detail', {
        params: { bookingID },
    })

    return res.data
}

export const createBooking = async (payload: BookingFormSchema) => {
    const res = await axiosClient.post('/booking/create', {
        payload,
    })

    return res.data
}

export const editBooking = async (payload: BookingFormSchema) => {
    const res = await axiosClient.put('/booking/update', {
        payload,
    })

    return res.data
}
