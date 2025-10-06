'use client'

import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

type BookingDetailSectionProps = FormSectionBaseProps

const BookingDetailSection = ({
    control,
    errors,
}: BookingDetailSectionProps) => {
    return (
        <Card id="addressInformation">
            <h4 className="mb-6">Booking details</h4>
            <FormItem
                label="Class Type"
                invalid={Boolean(errors.classType)}
                errorMessage={errors.classType?.message}
            >
                <Controller
                    name="classType"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Class Type"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem
                    label="Date"
                    invalid={Boolean(errors.date)}
                    errorMessage={errors.date?.message}
                >
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Date"
                                {...field}
                            />
                        )}
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
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Time"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
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
                                type="number"
                                autoComplete="off"
                                placeholder="Number of participants"
                                {...field}
                                onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                }
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default BookingDetailSection
