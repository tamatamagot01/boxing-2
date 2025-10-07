import type { Control, FieldErrors } from 'react-hook-form'

export type BookingFields = {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export type BookingFormSchema = BookingFields

export type CustomerDetailsFields = {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export type BookingDetailFields = {
    classType: string
    trainerID: number
    date: string
    timeID: string
    participant: number
}

export type BaseBookingFormSchema = CustomerDetailsFields & BookingDetailFields

export type FormSectionBaseProps = {
    control: Control<BaseBookingFormSchema>
    errors: FieldErrors<BaseBookingFormSchema>
}
