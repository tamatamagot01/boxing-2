import { BookingType } from '@/@types/common'
import axiosClient from '@/services/axiosClient'

export const getThisDayCustomer = async (
    classType: string,
    bookingDate: string,
    bookingTimeID: number,
) => {
    const res = await axiosClient.get('/booking/get-customer', {
        params: { classType, bookingDate, bookingTimeID },
    })
    return res.data
}

export const getConfirmBookingDetail = async (bookingTimeID: number) => {
    const res = await axiosClient.get('/booking/get-confirm', {
        params: { bookingTimeID },
    })
    return res.data
}

export const createBooking = async (payload: BookingType) => {
    const res = await axiosClient.post('/booking/create', {
        payload,
    })
    return res.data
}
