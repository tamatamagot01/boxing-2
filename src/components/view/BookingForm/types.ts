import type { Control, FieldErrors } from 'react-hook-form'

export type BookingFields = {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export type BookingFormSchema = BookingFields

export type Product = {
    id: string
    name: string
    productCode: string
    img: string
    price: number
    stock: number
}

export type Products = Product[]

export type GetProductListResponse = {
    list: Product[]
    total: number
}

export type ProductOption = {
    label: string
    img: string
    quantity: number
    value: string
}

export type SelectedProduct = Product & { quantity: number }

export type CustomerDetailsFields = {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export type BookingDetailFields = {
    classType: string
    date: string
    timeID: string
    participant: number
}

export type BaseOrderFormSchema = CustomerDetailsFields & BookingDetailFields

export type FormSectionBaseProps = {
    control: Control<BaseOrderFormSchema>
    errors: FieldErrors<BaseOrderFormSchema>
}
