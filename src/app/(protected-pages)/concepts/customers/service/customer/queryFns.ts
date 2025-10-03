import { BookingType, UserType } from '@/@types/common'
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

export const createCustomer = async (payload: UserType) => {
    const res = await axiosClient.post('/customer/create', {
        payload,
    })
    return res.data
}
