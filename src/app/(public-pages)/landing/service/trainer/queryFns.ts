import axiosClient from '@/services/axiosClient'

export const getTrainers = async () => {
    const res = await axiosClient.get('/trainer/get')
    return res.data
}
