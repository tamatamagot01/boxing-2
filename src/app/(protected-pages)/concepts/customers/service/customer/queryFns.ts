import { CustomerFormSchema } from '@/components/view/CustomerForm'
import axiosClient from '@/services/axiosClient'

interface CustomerQueryParams {
    query?: string
    pageIndex: string
    pageSize: string
}

export const getCustomers = async (params: CustomerQueryParams) => {
    const search = new URLSearchParams()

    search.append('pageIndex', params.pageIndex)
    search.append('pageSize', params.pageSize)

    if (params.query) {
        search.append('query', params.query)
    }

    const queryString = search.toString()

    const res = await axiosClient.get(`/customer/get-customers?${queryString}`)
    return res.data
}

export const getCustomer = async (customerID: number) => {
    const res = await axiosClient.get('/customer/get-customer', {
        params: { customerID },
    })

    return res.data
}

export const getCustomerAndBooking = async (customerID: number) => {
    const res = await axiosClient.get('/customer/get-customer-booking', {
        params: { customerID },
    })

    return res.data
}

export const createCustomer = async (payload: CustomerFormSchema) => {
    const res = await axiosClient.post('/customer/create', {
        payload,
    })

    return res.data
}

export const editCustomer = async (payload: CustomerFormSchema) => {
    const res = await axiosClient.post('/customer/update', {
        payload,
    })

    return res.data
}
