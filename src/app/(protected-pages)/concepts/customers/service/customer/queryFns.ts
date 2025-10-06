import { CustomerFormSchema } from '@/components/view/CustomerForm'
import axiosClient from '@/services/axiosClient'

export const getCustomers = async () => {
    const res = await axiosClient.get('/customer/get-customers')
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
