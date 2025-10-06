import { TrainerFormSchema } from '@/components/view/TrainerForm'
import axiosClient from '@/services/axiosClient'

interface TrainerQueryParams {
    query?: string
    pageIndex: string
    pageSize: string
}

export const getTrainers = async (params: TrainerQueryParams) => {
    const search = new URLSearchParams()

    search.append('pageIndex', params.pageIndex)
    search.append('pageSize', params.pageSize)

    if (params.query) {
        search.append('query', params.query)
    }

    const queryString = search.toString()

    const res = await axiosClient.get(`/trainer/get-trainers?${queryString}`)
    return res.data
}

export const getTrainer = async (trainerID: number) => {
    const res = await axiosClient.get('/trainer/get-trainer', {
        params: { trainerID },
    })

    return res.data
}

export const getTrainerAndBooking = async (trainerID: number) => {
    const res = await axiosClient.get('/trainer/get-trainer-booking', {
        params: { trainerID },
    })

    return res.data
}

export const createTrainer = async (payload: TrainerFormSchema) => {
    const res = await axiosClient.post('/trainer/create', {
        payload,
    })

    return res.data
}

export const editTrainer = async (payload: TrainerFormSchema) => {
    const res = await axiosClient.post('/trainer/update', {
        payload,
    })

    return res.data
}
