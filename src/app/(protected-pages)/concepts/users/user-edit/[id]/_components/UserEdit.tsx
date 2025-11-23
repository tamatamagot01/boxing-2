'use client'

import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import UserForm from '@/components/view/UserForm'
import sleep from '@/utils/sleep'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import type { UserFormSchema } from '@/components/view/UserForm'
import type { User } from '../types'
import { useMutation } from '@tanstack/react-query'
import { editUser } from '../../../service/user/queryFns'

type UserEditProps = {
    data: User
}

const UserEdit = ({ data }: UserEditProps) => {
    const router = useRouter()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: (userData: UserFormSchema) => {
            const payload = { id: data.user.id, ...userData }

            return editUser(payload)
        },
        onSuccess: () => {
            toast.push(
                <Notification type="success">Changes Saved!</Notification>,
                { placement: 'top-center' },
            )
            router.push('/concepts/users/user-list')
        },
        onError: (error: any) => {
            console.error(error)
            toast.push(
                <Notification type="danger">
                    {error.response.data.error}
                </Notification>,
                { placement: 'top-center' },
            )
            router.push('/concepts/users/user-list')
        },
    })

    const onSubmit = (userData: UserFormSchema) => {
        mutate(userData)
    }

    const getDefaultValues = () => {
        if (data) {
            const { first_name, last_name, email, phone, img } = data.user

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
        toast.push(<Notification type="success">User deleted!</Notification>, {
            placement: 'top-center',
        })
        router.push('/concepts/users/user-list')
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
            <UserForm
                defaultValues={getDefaultValues() as UserFormSchema}
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
            </UserForm>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove users"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    Are you sure you want to remove this user? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default UserEdit
