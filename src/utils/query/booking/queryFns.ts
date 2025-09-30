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
