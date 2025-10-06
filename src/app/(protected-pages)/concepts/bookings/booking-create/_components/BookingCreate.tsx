'use client'

import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import BookingForm from '@/components/view/BookingForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbTrash } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import type { BookingFormSchema } from '@/components/view/BookingForm'
import { useMutation } from '@tanstack/react-query'
import { createBooking } from '../../service/bookings/queryFns'

const BookingCreate = () => {
    const router = useRouter()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: (bookingData: BookingFormSchema) => {
            const payload = bookingData
            return createBooking(payload)
        },
        onSuccess: () => {
            toast.push(
                <Notification type="success">Booking created!</Notification>,
                { placement: 'top-center' },
            )
            router.push('/concepts/bookings/booking-list')
        },
        onError: (error: any) => {
            console.error(error)
            toast.push(
                <Notification type="danger">
                    {error.response.data.error}
                </Notification>,
                { placement: 'top-center' },
            )
            router.push('/concepts/bookings/booking-list')
        },
    })

    const onSubmit = (userData: BookingFormSchema) => {
        mutate(userData)
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Booking discard!</Notification>,
            { placement: 'top-center' },
        )
        router.push('/concepts/bookings/booking-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <BookingForm
                defaultValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                }}
                onFormSubmit={onSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isPending}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </BookingForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want discard this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default BookingCreate
