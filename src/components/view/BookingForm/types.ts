import type { Control, FieldErrors } from 'react-hook-form'

export type BookingFields = {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export type BookingFormSchema = BookingFields

export type FormSectionBaseProps = {
    control: Control<BookingFormSchema>
    errors: FieldErrors<BookingFormSchema>
}
