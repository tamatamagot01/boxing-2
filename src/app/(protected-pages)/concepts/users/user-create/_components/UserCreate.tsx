'use client'

import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import UserForm from '@/components/view/UserForm'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import type { UserFormSchema } from '@/components/view/UserForm'
import { useMutation } from '@tanstack/react-query'
import { createUser } from '../../service/user/queryFns'

const UserCreate = () => {
    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: (userData: UserFormSchema) => {
            const payload = userData
            return createUser(payload)
        },
        onSuccess: () => {
            toast.push(
                <Notification type="success">User created!</Notification>,
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

    const handleBack = () => {
        router.push('/concepts/users/user-list')
    }

    return (
        <>
            <UserForm
                defaultValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                }}
                onFormSubmit={onSubmit}
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
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </UserForm>
        </>
    )
}

export default UserCreate
