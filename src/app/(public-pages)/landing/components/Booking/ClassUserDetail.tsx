import { Input } from '@/components/ui'
import React from 'react'
import { Form, FormItem } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { headerLists } from '../../store/headerStore'

type UserDetailSchema = {
    firstName: string
    lastName: string
    email: string
    phone: string
}

const validationSchema: ZodType<UserDetailSchema> = z.object({
    firstName: z.string().min(1, { message: 'First name required' }),
    lastName: z.string().min(1, { message: 'Last name required' }),
    email: z
        .string()
        .min(1, { message: 'Email required' })
        .email({ message: 'Invalid email' }),
    phone: z.string().min(1, { message: 'Please input your mobile number' }),
})

export default function ClassUserDetail() {
    const header = headerLists[2]

    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control,
    } = useForm<UserDetailSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values: UserDetailSchema) => {
        console.log(99, values)
    }

    return (
        <>
            <div className="px-6 pb-6">
                <h4 className="mb-2">Book a class</h4>
                <h6>{header.name}</h6>
                <hr className="my-4" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-2 w-full">
                        <div className="flex flex-col w-full">
                            <label className="font-bold">First name</label>
                            <FormItem
                                invalid={Boolean(errors.firstName)}
                                errorMessage={errors.firstName?.message}
                            >
                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            className="mt-2"
                                            type="text"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="font-bold">Last name</label>
                            <FormItem
                                invalid={Boolean(errors.lastName)}
                                errorMessage={errors.lastName?.message}
                            >
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            className="mt-2"
                                            type="text"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full">
                        <div className="flex flex-col w-full">
                            <label className="font-bold">Email</label>
                            <FormItem
                                invalid={Boolean(errors.email)}
                                errorMessage={errors.email?.message}
                            >
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            className="mt-2"
                                            type="email"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="font-bold">Phone</label>
                            <FormItem
                                invalid={Boolean(errors.phone)}
                                errorMessage={errors.phone?.message}
                            >
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            className="mt-2"
                                            type="text"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}
