'use client'

import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import TrainerForm from '@/components/view/TrainerForm'
import sleep from '@/utils/sleep'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import type { TrainerFormSchema } from '@/components/view/TrainerForm'
import type { Trainer } from '../types'
import { useMutation } from '@tanstack/react-query'
import { editTrainer } from '../../../service/trainers/queryFns'

type TrainerEditProps = {
    data: Trainer
}

const TrainerEdit = ({ data }: TrainerEditProps) => {
    const router = useRouter()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: (userData: TrainerFormSchema) => {
            const payload = { id: data.trainer.id, ...userData }

            return editTrainer(payload)
        },
        onSuccess: () => {
            toast.push(
                <Notification type="success">Changes Saved!</Notification>,
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

    const getDefaultValues = () => {
        if (data) {
            const { first_name, last_name, email, phone, img } = data.trainer

            return {
                firstName: first_name,
                lastName: last_name,
                email,
                img,
                phone,
            }
        }

        return {}
    }

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(true)
        toast.push(
            <Notification type="success">Trainer deleted!</Notification>,
            { placement: 'top-center' },
        )
        router.push('/concepts/trainers/trainer-list')
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        history.back()
    }

    return (
        <>
            <TrainerForm
                defaultValues={getDefaultValues() as TrainerFormSchema}
                onFormSubmit={onSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <Button
                            className="ltr:mr-3 rtl:ml-3"
                            type="button"
                            variant="plain"
                            icon={<TbArrowNarrowLeft />}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isPending}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </Container>
            </TrainerForm>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove trainers"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    Are you sure you want to remove this trainer? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default TrainerEdit
