import axiosClient from '../axiosClient'

export const getClassTime = async (classType: 'private' | 'group' | null) => {
    const res = await axiosClient.get('/time/get', {
        params: { classType },
    })
    return res.data
}
