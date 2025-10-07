import axiosClient from '@/services/axiosClient'

export const getTrainerAndClassTime = async (
    classType: 'private' | 'group' | null,
) => {
    const res = await axiosClient.get('/time/get-trainer-time', {
        params: { classType },
    })
    return res.data
}
