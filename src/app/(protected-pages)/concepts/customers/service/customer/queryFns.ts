import { BookingType } from '@/@types/common'
import axiosClient from '@/services/axiosClient'

export const getCustomers = async () => {
    const res = await axiosClient.get('/customer/get-customers')
    return res.data
}

export const getConfirmBookingDetail = async (
    trainerID: number,
    bookingTimeID: number,
) => {
    const res = await axiosClient.get('/booking/get-confirm', {
        params: { trainerID, bookingTimeID },
    })
    return res.data
}

export const createBooking = async (payload: BookingType) => {
    const res = await axiosClient.post('/booking/create', {
        payload,
    })
    return res.data
}
