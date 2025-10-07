'use client'

import { Form } from '@/components/ui/Form'
import Affix from '@/components/shared/Affix'
import Card from '@/components/ui/Card'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import CustomerDetailSection from './components/CustomerDetailSection'
import BookingDetailSection from './components/BookingDetailSection'
import Navigator from './components/Navigator'
import useLayoutGap from '@/utils/hooks/useLayoutGap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ReactNode } from 'react'
import type { BaseBookingFormSchema } from './types'
import type { CommonProps } from '@/@types/common'

type BookingFormProps = {
    children: ReactNode
    onFormSubmit: (values: BaseBookingFormSchema) => void
    defaultValues?: BaseBookingFormSchema
    newBooking?: boolean
} & CommonProps

const validationSchema = z.object({
    firstName: z.string().min(1, { message: 'First name required' }),
    lastName: z.string().min(1, { message: 'Last name required' }),
    email: z
        .string()
        .min(1, { message: 'Email required' })
        .email({ message: 'Invalid email' }),
    phone: z.string().regex(/^0\d{9}$/, { message: 'Invalid phone number' }),
    classType: z.string().min(1, { message: 'Class type required' }),
    trainerID: z.union([z.string(), z.number()]).refine((v) => v !== '', {
        message: 'Trainer is required',
    }),
    date: z.string().min(1, { message: 'Date required' }),
    timeID: z.union([z.string(), z.number()]).refine((v) => v !== '', {
        message: 'Time is required',
    }),
    participant: z
        .number()
        .min(1, { message: 'At least one participant required' }),
})

const BookingForm = (props: BookingFormProps) => {
    const { onFormSubmit, children, defaultValues } = props

    const { getTopGapValue } = useLayoutGap()

    const onSubmit = (values: BaseBookingFormSchema) => {
        onFormSubmit?.(values)
    }

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<BaseBookingFormSchema>({
        defaultValues: {
            ...(defaultValues ? defaultValues : {}),
        },
        resolver: zodResolver(validationSchema),
    })

    return (
        <div className="flex">
            <Form
                className="flex-1 flex flex-col overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="flex gap-4">
                        <div className="w-[360px] hidden lg:block">
                            <Affix offset={getTopGapValue()}>
                                <Card>
                                    <Navigator />
                                </Card>
                            </Affix>
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col gap-4">
                                <CustomerDetailSection
                                    control={control}
                                    errors={errors}
                                />
                                <BookingDetailSection
                                    control={control}
                                    errors={errors}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>{children}</BottomStickyBar>
            </Form>
        </div>
    )
}

export default BookingForm
