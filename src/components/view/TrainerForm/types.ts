import type { Control, FieldErrors } from 'react-hook-form'

export type TrainerFields = {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export type TrainerFormSchema = TrainerFields

export type FormSectionBaseProps = {
    control: Control<TrainerFormSchema>
    errors: FieldErrors<TrainerFormSchema>
}
