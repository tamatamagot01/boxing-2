'use client'

import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { UserFormSchema } from './types'

type UserFormProps = {
    onFormSubmit: (values: UserFormSchema) => void
    defaultValues?: UserFormSchema
    isEditMode?: boolean
} & CommonProps

const UserForm = (props: UserFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        isEditMode = false,
        children,
    } = props

    const validationSchema: ZodType<UserFormSchema> = z
        .object({
            firstName: z.string().min(1, { message: 'First name required' }),
            lastName: z.string().min(1, { message: 'Last name required' }),
            email: z
                .string()
                .min(1, { message: 'Email required' })
                .email({ message: 'Invalid email' }),
            phone: z
                .string()
                .regex(/^0\d{9}$/, { message: 'Invalid phone number' }),
            password: isEditMode
                ? z.string().optional()
                : z.string().min(6, {
                      message: 'Password must be at least 6 characters',
                  }),
            confirmPassword: isEditMode
                ? z.string().optional()
                : z
                      .string()
                      .min(1, { message: 'Please confirm your password' }),
        })
        .refine(
            (data) => {
                // Skip password match validation if both are empty in edit mode
                if (isEditMode && !data.password && !data.confirmPassword) {
                    return true
                }
                // If either password field has value, they must match
                if (data.password || data.confirmPassword) {
                    return data.password === data.confirmPassword
                }
                return true
            },
            {
                message: "Passwords don't match",
                path: ['confirmPassword'],
            },
        )

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<UserFormSchema>({
        defaultValues: {
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: UserFormSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <OverviewSection
                            control={control}
                            errors={errors}
                            isEditMode={isEditMode}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default UserForm
