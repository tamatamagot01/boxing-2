import { UserFormSchema } from '@/components/view/UserForm'
import axiosClient from '@/services/axiosClient'

interface UserQueryParams {
    query?: string
    pageIndex: string
    pageSize: string
}

export const getUsers = async (params: UserQueryParams) => {
    const search = new URLSearchParams()

    search.append('pageIndex', params.pageIndex)
    search.append('pageSize', params.pageSize)

    if (params.query) {
        search.append('query', params.query)
    }

    const queryString = search.toString()

    const res = await axiosClient.get(`/user/get-users?${queryString}`)
    return res.data
}

export const getUser = async (userID: number) => {
    const res = await axiosClient.get('/user/get-user', {
        params: { userID },
    })

    return res.data
}

export const getUserAndBooking = async (userID: number) => {
    const res = await axiosClient.get('/user/get-user-booking', {
        params: { userID },
    })

    return res.data
}

export const createUser = async (payload: UserFormSchema) => {
    const res = await axiosClient.post('/user/create', {
        payload,
    })

    return res.data
}

export const editUser = async (payload: UserFormSchema) => {
    const res = await axiosClient.post('/user/update', {
        payload,
    })

    return res.data
}
