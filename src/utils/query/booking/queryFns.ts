import { BookingType } from '@/@types/common'
import axiosClient from '../axiosClient'

export const getThisDayBooking = async (
    classType: string,
    bookingDate: string,
    bookingTimeID: number,
) => {
    const res = await axiosClient.get('/booking/get', {
        params: { classType, bookingDate, bookingTimeID },
    })
    return res.data
}

export const getBookings = async () => {
    const res = await axiosClient.get('/booking/get-all')
    return res.data
}

export const getThisDayCustomer = async (
    classType: string,
    trainerID: number,
    bookingDate: string,
    bookingTimeID: number,
) => {
    const res = await axiosClient.get('/booking/get-customer', {
        params: { classType, trainerID, bookingDate, bookingTimeID },
    })
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
