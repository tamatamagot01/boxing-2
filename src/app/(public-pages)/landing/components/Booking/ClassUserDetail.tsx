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
            <div className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Booking Summary
                </h6>
                <div className="space-y-2">
                    {classType && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                Class Type
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs font-semibold">
                                {classType.charAt(0).toUpperCase() +
                                    classType.slice(1)}
                            </span>
                        </div>
                    )}

                    {date && timeLabel && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                Date & Time
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-semibold">
                                {date.split('-').reverse().join('/')} at{' '}
                                {timeLabel}
                            </span>
                        </div>
                    )}

                    {participant && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                Participants
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500 text-white text-xs font-semibold">
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
