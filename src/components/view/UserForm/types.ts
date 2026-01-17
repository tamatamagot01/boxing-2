import type { Control, FieldErrors } from 'react-hook-form'

export type UserFields = {
    firstName: string
    lastName: string
    email: string
    phone: string
    password?: string
    confirmPassword?: string
}

export type UserFormSchema = UserFields

export type FormSectionBaseProps = {
    control: Control<UserFormSchema>
    errors: FieldErrors<UserFormSchema>
}
