import type { Control, FieldErrors } from 'react-hook-form'

export type CustomerFields = {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export type CustomerFormSchema = CustomerFields

export type FormSectionBaseProps = {
    control: Control<CustomerFormSchema>
    errors: FieldErrors<CustomerFormSchema>
}
