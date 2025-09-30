import { Input } from '@/components/ui'
import React from 'react'
import { Form, FormItem } from '@/components/ui/Form'
import { headerLists } from '../../store/headerStore'
import { UserDetailInputType } from './BookingDialog'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

type propTypes = {
    register: UseFormRegister<UserDetailInputType>
    errors: FieldErrors<UserDetailInputType>
}

export default function ClassUserDetail({ register, errors }: propTypes) {
    const header = headerLists[2]

    return (
        <div className="px-6 pb-6">
            <h4 className="mb-2">Book a class</h4>
            <h6>{header.name}</h6>
            <hr className="my-4" />

            <Form>
                <div className="flex gap-2 w-full">
                    <div className="flex flex-col w-full">
                        <label className="font-bold">First name</label>
                        <FormItem
                            invalid={Boolean(errors.first_name)}
                            errorMessage={errors.first_name?.message}
                        >
                            <Input
                                className="mt-2"
                                type="text"
                                autoComplete="off"
                                {...register('first_name')}
                            />
                        </FormItem>
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="font-bold">Last name</label>
                        <FormItem
                            invalid={Boolean(errors.last_name)}
                            errorMessage={errors.last_name?.message}
                        >
                            <Input
                                className="mt-2"
                                type="text"
                                autoComplete="off"
                                {...register('last_name')}
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
                            <Input
                                className="mt-2"
                                type="email"
                                autoComplete="off"
                                {...register('email')}
                            />
                        </FormItem>
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="font-bold">Phone</label>
                        <FormItem
                            invalid={Boolean(errors.phone)}
                            errorMessage={errors.phone?.message}
                        >
                            <Input
                                className="mt-2"
                                type="text"
                                autoComplete="off"
                                {...register('phone')}
                            />
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
    )
}
