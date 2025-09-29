import axiosClient from '../axiosClient'

export const getThisDayBooking = async (
    bookingDate: string,
    bookingTimeID: number,
) => {
    const res = await axiosClient.get('/booking/get', {
        params: { bookingDate, bookingTimeID },
    })
    return res.data
}

export const getBookings = async () => {
    const res = await axiosClient.get('/booking/get-all')
    return res.data
}
