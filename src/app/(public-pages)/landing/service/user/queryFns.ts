import axiosClient from '@/services/axiosClient'

export type RegisterUserPayload = {
    firstName: string
    lastName: string
    email: string
    phone?: string
    password: string
}

export type RegisterUserResponse = {
    success: boolean
    message: string
    user?: {
        id: number
        email: string
        firstName: string
        lastName: string
    }
}

export type GetCurrentUserResponse = {
    success: boolean
    message?: string
    user?: {
        id: number
        email: string
        phone: string | null
        first_name: string
        last_name: string
    }
}

export const createUser = async (payload: RegisterUserPayload) => {
    const res = await axiosClient.post('/user/create', {
        payload,
    })
    return res.data as RegisterUserResponse
}

export const getCurrentUser = async () => {
    const res = await axiosClient.get('/user/me')
    return res.data as GetCurrentUserResponse
}
