'use client'

import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import UserForm from '@/components/view/UserForm'
import { TbArrowNarrowLeft } from 'react-icons/tb'
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
                password: '',
                confirmPassword: '',
            }
        }

        return {}
    }

    const handleBack = () => {
        router.push('/concepts/users/user-list')
    }

    return (
        <>
            <UserForm
                defaultValues={getDefaultValues() as UserFormSchema}
                onFormSubmit={onSubmit}
                isEditMode={true}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <Button
                            type="button"
                            icon={<TbArrowNarrowLeft />}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <div className="flex items-center">
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
        </>
    )
}

export default UserEdit
