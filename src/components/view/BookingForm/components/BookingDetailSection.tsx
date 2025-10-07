'use client'

import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller, useWatch } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'
import { DatePicker, Select } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { getThisDayCustomer } from '@/app/(public-pages)/landing/service/booking/queryFns'
import { getTrainerAndClassTime } from '../service/trainer-time/queryFns'
import { useEffect } from 'react'
import { useClassParticipantStore } from '@/app/(public-pages)/landing/store/clientStore'
import dayjs from 'dayjs'
import Loading from '@/components/ui/Loading/Loading'

type BookingDetailSectionProps = FormSectionBaseProps

const BookingDetailSection = ({
    control,
    errors,
}: BookingDetailSectionProps) => {
    const classType = useWatch({ control, name: 'classType' })

    const {
        maxGroupParticipant,
        maxPrivateParticipant,
        currentAvailable,
        setCurrentAvailable,
    } = useClassParticipantStore()

    const { isPending, data } = useQuery({
        queryKey: ['results', classType],
        queryFn: () => getTrainerAndClassTime(classType as any),
        enabled: !!classType,
    })

    const classTypeOptions = [
        { label: 'Private', value: 'private' },
        { label: 'Group', value: 'group' },
    ]

    const trainerOptions =
        data?.results.trainers?.map((trainer: any) => ({
            label: `${trainer.first_name} ${trainer.last_name}`,
            value: trainer.id,
        })) ?? []

    const timeOptions =
        data?.results.times?.map((time: any) => ({
            label: time.time,
            value: time.id,
        })) ?? []

    const trainerID = useWatch({ control, name: 'trainerID' })
    const date = useWatch({ control, name: 'date' })
    const timeID = useWatch({ control, name: 'timeID' })

    const { data: bookingData, isPending: isPendingBookingData } = useQuery({
        queryKey: ['bookings', classType, trainerID, date, timeID],
        queryFn: () =>
            getThisDayCustomer(
                classType!,
                trainerID,
                date.split('T')[0],
                Number(timeID),
            ),
        enabled: !!classType && !!date && !!timeID,
    })

    const thisDayCustomer = bookingData?.bookings._sum.participant ?? 0

    useEffect(() => {
        if (classType === 'private') {
            setCurrentAvailable(maxPrivateParticipant - thisDayCustomer)
        }

        if (classType === 'group') {
            setCurrentAvailable(maxGroupParticipant - thisDayCustomer)
        }
    }, [thisDayCustomer, classType, date, timeID])

    return (
        <Card id="addressInformation">
            <h4 className="mb-6">Booking details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem
                    label="Class Type"
                    invalid={Boolean(errors.classType)}
                    errorMessage={errors.classType?.message}
                >
                    <Controller
                        name="classType"
                        control={control}
                        render={({ field }) => (
                            <Select
                                placeholder="Class Type"
                                options={classTypeOptions}
                                value={
                                    classTypeOptions.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Trainer"
                    invalid={Boolean(errors.trainerID)}
                    errorMessage={errors.timeID?.message}
                >
                    <Controller
                        name="trainerID"
                        control={control}
                        render={({ field }) => (
                            <Select
                                placeholder="Trainer"
                                isLoading={isPending}
                                isDisabled={!classType || classType === 'group'}
                                options={trainerOptions}
                                value={
                                    trainerOptions.find(
                                        (option: any) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem
                    label="Date"
                    invalid={Boolean(errors.date)}
                    errorMessage={errors.date?.message}
                >
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => {
                            const today = new Date()

                            return (
                                <DatePicker
                                    placeholder="Select date"
                                    inputFormat="DD/MM/YYYY"
                                    minDate={today}
                                    value={
                                        field.value
                                            ? new Date(field.value)
                                            : null
                                    }
                                    onChange={(date) => {
                                        const formattedDate = dayjs(
                                            date?.toLocaleDateString(),
                                        ).format('YYYY-MM-DD')
                                        return field.onChange(formattedDate)
                                    }}
                                />
                            )
                        }}
                    />
                </FormItem>
                <FormItem
                    label="Time"
                    invalid={Boolean(errors.timeID)}
                    errorMessage={errors.timeID?.message}
                >
                    <Controller
                        name="timeID"
                        control={control}
                        render={({ field }) => (
                            <Select
                                placeholder="Time"
                                isLoading={isPending}
                                isDisabled={!classType}
                                options={timeOptions}
                                value={
                                    timeOptions.find(
                                        (option: any) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>
            </div>

            <FormItem
                label="Participant"
                invalid={Boolean(errors.participant)}
                errorMessage={errors.participant?.message}
            >
                <Controller
                    name="participant"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            disabled={
                                !classType ||
                                !date ||
                                !timeID ||
                                !currentAvailable
                            }
                            value={
                                (field.value ?? 0) > currentAvailable
                                    ? currentAvailable
                                    : (field.value ?? 0)
                            }
                            onChange={(e) =>
                                field.onChange(Number(e.target.value))
                            }
                            min={1}
                            max={currentAvailable}
                            autoComplete="off"
                            placeholder="Number of participants"
                        />
                    )}
                />
            </FormItem>

            {!isPendingBookingData ? (
                currentAvailable ? (
                    <p className="text-success mt-1.5">
                        Available spots : <span>{currentAvailable}</span>
                    </p>
                ) : (
                    <p className="text-error mt-1.5">
                        No available spots for this time
                    </p>
                )
            ) : (
                <Loading />
            )}
        </Card>
    )
}

export default BookingDetailSection
