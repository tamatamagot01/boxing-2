import { Input } from '@/components/ui'
import React from 'react'
import { Form, FormItem } from '@/components/ui/Form'
import { headerLists } from '../../store/headerStore'
import { UserDetailInputType } from './BookingDialog'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import {
    useClassDateStore,
    useClassParticipantStore,
    useClassTypeStore,
} from '../../store/clientStore'

type propTypes = {
    register: UseFormRegister<UserDetailInputType>
    errors: FieldErrors<UserDetailInputType>
}

type TimeOption = {
    label: string
    value: number
}

export default function ClassUserDetail({ register, errors }: propTypes) {
    const header = headerLists[2]

    const { classType } = useClassTypeStore()

    const { date, timeLabel } = useClassDateStore()

    const { participant } = useClassParticipantStore()

    return (
        <div className="px-6 pb-6">
            <h4 className="mb-2">Book a class</h4>
            <h6>{header.name}</h6>
            <hr className="my-4" />

            {/* Booking Summary Card */}
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="space-y-2">
                    {classType && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Class:
                            </span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {classType.charAt(0).toUpperCase() +
                                    classType.slice(1)}
                            </span>
                        </div>
                    )}

                    {date && timeLabel && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Date & Time:
                            </span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {date.split('-').reverse().join('/')} •{' '}
                                {timeLabel}
                            </span>
                        </div>
                    )}

                    {participant && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Participants:
                            </span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {participant}{' '}
                                {participant > 1 ? 'people' : 'person'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

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
                        <label className="font-bold">
                            Phone{' '}
                            <span className="text-xs text-green-500 dark:text-green-400 font-normal">
                                (Optional)
                            </span>
                        </label>
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
