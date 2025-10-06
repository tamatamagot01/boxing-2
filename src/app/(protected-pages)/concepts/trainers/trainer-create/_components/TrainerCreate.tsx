'use client'

import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import TrainerForm from '@/components/view/TrainerForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbTrash } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import type { TrainerFormSchema } from '@/components/view/TrainerForm'
import { useMutation } from '@tanstack/react-query'
import { createTrainer } from '../../service/trainers/queryFns'

const TrainerCreate = () => {
    const router = useRouter()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: (userData: TrainerFormSchema) => {
            const payload = userData
            return createTrainer(payload)
        },
        onSuccess: () => {
            toast.push(
                <Notification type="success">Trainer created!</Notification>,
                { placement: 'top-center' },
            )
            router.push('/concepts/trainers/trainer-list')
        },
        onError: (error: any) => {
            console.error(error)
            toast.push(
                <Notification type="danger">
                    {error.response.data.error}
                </Notification>,
                { placement: 'top-center' },
            )
            router.push('/concepts/trainers/trainer-list')
        },
    })

    const onSubmit = (userData: TrainerFormSchema) => {
        mutate(userData)
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Trainer discard!</Notification>,
            { placement: 'top-center' },
        )
        router.push('/concepts/trainers/trainer-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <TrainerForm
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
            </TrainerForm>
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

export default TrainerCreate
