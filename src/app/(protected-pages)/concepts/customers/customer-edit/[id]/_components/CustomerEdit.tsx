'use client'

import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import CustomerForm from '@/components/view/CustomerForm'
import sleep from '@/utils/sleep'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import type { CustomerFormSchema } from '@/components/view/CustomerForm'
import type { Customer } from '../types'
import { useMutation } from '@tanstack/react-query'
import { editCustomer } from '../../../service/customer/queryFns'

type CustomerEditProps = {
    data: Customer
}

const CustomerEdit = ({ data }: CustomerEditProps) => {
    const router = useRouter()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: (userData: CustomerFormSchema) => {
            const payload = { id: data.customer.id, ...userData }

            return editCustomer(payload)
        },
        onSuccess: () => {
            toast.push(
                <Notification type="success">Changes Saved!</Notification>,
                { placement: 'top-center' },
            )
            router.push('/concepts/customers/customer-list')
        },
        onError: (error: any) => {
            console.error(error)
            toast.push(
                <Notification type="danger">
                    {error.response.data.error}
                </Notification>,
                { placement: 'top-center' },
            )
            router.push('/concepts/customers/customer-list')
        },
    })

    const onSubmit = (userData: CustomerFormSchema) => {
        mutate(userData)
    }

    const getDefaultValues = () => {
        if (data) {
            const { first_name, last_name, email, phone, img } = data.customer

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
            <Notification type="success">Customer deleted!</Notification>,
            { placement: 'top-center' },
        )
        router.push('/concepts/customers/customer-list')
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
            <CustomerForm
                defaultValues={getDefaultValues() as CustomerFormSchema}
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
            </CustomerForm>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove customers"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    Are you sure you want to remove this customer? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default CustomerEdit
