import { Button, Dialog } from '@/components/ui'
import UserTypeSelection from './UserTypeSelection'
import RegisterForm, { type RegisterData } from './RegisterForm'
import ClassType from './ClassType'
import ClassTime from './ClassTime'
import ClassUserDetail from './ClassUserDetail'
import { useHeaderStore } from '../../store/headerStore'
import {
    useUserTypeStore,
    useClassDateStore,
    useClassParticipantStore,
    useClassTypeStore,
} from '../../store/clientStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import BookingConfirmation from './BookingConfirmation'
import BookingSuccess from './BookingSuccess'
import { createBooking } from '../../service/booking/queryFns'
import { useState, useEffect } from 'react'
import { getCurrentUser } from '../../service/user/queryFns'

type BookingDialogProps = {
    isOpen: boolean
    setIsOpenBookingDialog: (isOpen: boolean) => void
}

export type UserDetailInputType = {
    first_name: string
    last_name: string
    email: string
    phone: string
}

const userDetailSchema = z.object({
    first_name: z.string().min(1, { message: 'Required' }),
    last_name: z.string().min(1, { message: 'Required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().regex(/^0\d{9}$/, { message: 'Invalid phone number' }),
})

export default function BookingDialog({
    isOpen,
    setIsOpenBookingDialog,
}: BookingDialogProps) {
    // State for registered user
    const [registeredUser, setRegisteredUser] = useState<{
        id: number
        email: string
        firstName: string
        lastName: string
        phone: string
    } | null>(null)

    // State for tracking loading status of child components
    const [isChildLoading, setIsChildLoading] = useState(false)

    // Check if user is already logged in when dialog opens
    useEffect(() => {
        const checkSession = async () => {
            if (isOpen && !registeredUser) {
                try {
                    const userData = await getCurrentUser()
                    if (userData.success && userData.user) {
                        // User is logged in, set their data
                        setRegisteredUser({
                            id: userData.user.id,
                            email: userData.user.email,
                            firstName: userData.user.first_name,
                            lastName: userData.user.last_name,
                            phone: userData.user.phone || '',
                        })
                        setUserType('member')

                        // Pre-fill the form
                        reset({
                            first_name: userData.user.first_name,
                            last_name: userData.user.last_name,
                            email: userData.user.email,
                            phone: userData.user.phone || '',
                        })
                    }
                } catch (error) {
                    // User not logged in, do nothing
                    console.log('No active session')
                }
            }
        }

        checkSession()
    }, [isOpen])

    // headerStore
    const { headerID, resetHeaderID, incHeaderID, decHeaderID } =
        useHeaderStore()

    // bookingStore
    const { userType, setUserType, clearUserType } = useUserTypeStore()
    const { classType, clearClassType } = useClassTypeStore()
    const { date, timeID, clearDate, clearTime } = useClassDateStore()
    const { participant, clearParticipant, currentAvailable } =
        useClassParticipantStore()

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
        getValues,
    } = useForm<UserDetailInputType>({
        resolver: zodResolver(userDetailSchema),
        mode: 'onSubmit',
        defaultValues: { first_name: '', last_name: '', email: '', phone: '' },
    })

    const firstName = watch('first_name')
    const lastName = watch('last_name')
    const email = watch('email')
    const phone = watch('phone')

    // logic
    const handleCloseDialog = () => {
        setIsOpenBookingDialog(false)
        resetHeaderID()
        clearUserType()
        clearClassType()
        clearDate()
        clearTime()
        clearParticipant()
        setRegisteredUser(null)
        reset()
    }

    const handlePreviousButton = () => {
        if (headerID === 1) {
            setIsOpenBookingDialog(false)
            resetHeaderID()
            clearUserType()
        }

        if (headerID === 2) {
            decHeaderID()
            clearClassType()
        }

        if (headerID === 3) {
            decHeaderID()
            clearDate()
            clearTime()
            clearParticipant()
        }

        // If going back from confirmation and user is logged in, skip user detail page
        if (headerID === 5 && registeredUser) {
            decHeaderID()
            decHeaderID() // Skip headerID 4 (ClassUserDetail)
        } else if (headerID === 4 || headerID === 5) {
            decHeaderID()
        }
    }

    const handleDisableNextButton = () => {
        // Disable if child component is loading
        if (isChildLoading) {
            return true
        }

        if (headerID === 1) {
            if (!userType) {
                return true
            }
        }

        if (headerID === 2) {
            if (!classType) {
                return true
            }
        }

        if (headerID === 3) {
            if (!date || !timeID || !participant) {
                return true
            }

            if (currentAvailable - participant < 0) {
                return true
            }
        }

        if (headerID === 4) {
            // Only validate form fields if user is NOT logged in
            if (!registeredUser) {
                if (
                    firstName === '' ||
                    lastName === '' ||
                    email === '' ||
                    phone === ''
                ) {
                    return true
                }
            }
        }

        // At confirmation page, never disable if user is logged in
        if (headerID === 5 && registeredUser) {
            return false
        }
    }

    const { mutate, isPending, error, isSuccess, data } = useMutation({
        mutationFn: (userData: UserDetailInputType & { userID?: number }) => {
            const payload = {
                ...userData,
                classType: classType!,
                date: date!,
                timeID: timeID!,
                participant,
                userID: userData.userID, // Include userID for member bookings
            }
            return createBooking(payload)
        },
        onSuccess: (data) => {
            clearUserType()
            clearClassType()
            clearDate()
            clearTime()
            clearParticipant()
            setRegisteredUser(null)
            reset()
        },
        onError: (error) => {
            console.error(error)
        },
    })

    if (error) {
        return (
            'An error has occurred: ' +
            ((error as any).response?.data?.error || (error as Error).message)
        )
    }

    const onSubmit = (userData: UserDetailInputType) => {
        // If user registered, include their userID
        if (registeredUser) {
            mutate({ ...userData, userID: registeredUser.id })
        } else {
            // Guest booking - no userID
            mutate(userData)
        }
    }

    const handleNextButton = () => {
        // If at ClassTime (headerID 3) and user is logged in, skip to Confirmation (headerID 5)
        if (headerID === 3 && registeredUser) {
            incHeaderID() // Go to 4
            incHeaderID() // Go to 5
        } else if (headerID === 5 && registeredUser) {
            // If user is logged in, submit with their data directly
            onSubmit({
                first_name: registeredUser.firstName,
                last_name: registeredUser.lastName,
                email: registeredUser.email,
                phone: registeredUser.phone,
            })
        } else if (headerID === 5) {
            // Guest user - submit with form data
            handleSubmit(onSubmit)()
        } else {
            incHeaderID()
        }
    }

    const handleRegister = (
        registerData: RegisterData & { userId?: number },
    ) => {
        // Store registered user info
        if (registerData.userId) {
            setRegisteredUser({
                id: registerData.userId,
                email: registerData.email,
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                phone: registerData.phone || '',
            })

            // Pre-fill the booking form with registered user data
            reset({
                first_name: registerData.firstName,
                last_name: registerData.lastName,
                email: registerData.email,
                phone: registerData.phone || '',
            })

            // Set user type to member and proceed to next step
            setUserType('member')
            incHeaderID()
        }
    }

    const handleBackToLogin = () => {
        clearUserType()
    }

    const handleLoginSuccess = (userData: {
        id: number
        email: string
        firstName: string
        lastName: string
        phone: string
    }) => {
        // Store logged-in user info
        setRegisteredUser(userData)

        // Pre-fill the booking form with user data
        reset({
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            phone: userData.phone,
        })
    }

    return (
        <Dialog
            isOpen={isOpen}
            width={headerID === 4 || headerID === 5 ? 500 : 375}
            style={{
                content: {
                    marginTop: headerID === 1 || headerID === 2 ? 150 : 100,
                },
            }}
            contentClassName="pb-0 px-0"
            onClose={handleCloseDialog}
        >
            {headerID === 1 && (
                <>
                    {userType !== 'register' ? (
                        <UserTypeSelection
                            selectedType={userType}
                            onSelectType={setUserType}
                            onNext={incHeaderID}
                            onLoginSuccess={handleLoginSuccess}
                        />
                    ) : (
                        <RegisterForm
                            onRegister={handleRegister}
                            onBackToLogin={handleBackToLogin}
                        />
                    )}
                </>
            )}
            {headerID === 2 && (
                <ClassType onLoadingChange={setIsChildLoading} />
            )}
            {headerID === 3 && (
                <ClassTime onLoadingChange={setIsChildLoading} />
            )}
            {/* Only show ClassUserDetail if user is NOT logged in */}
            {headerID === 4 && !registeredUser && (
                <ClassUserDetail register={register} errors={errors} />
            )}
            {headerID === 5 && !isSuccess && (
                <BookingConfirmation
                    getUserData={
                        registeredUser
                            ? () => ({
                                  first_name: registeredUser.firstName,
                                  last_name: registeredUser.lastName,
                                  email: registeredUser.email,
                                  phone: registeredUser.phone,
                              })
                            : getValues
                    }
                    onLoadingChange={setIsChildLoading}
                />
            )}
            {isSuccess && (
                <BookingSuccess
                    bookingID={data.booking.bookingID}
                    customerEmail={data.booking.user.email}
                />
            )}

            {isSuccess ? (
                <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                    <Button
                        className="w-full"
                        onClick={() => window.location.reload()}
                    >
                        Back to home
                    </Button>
                </div>
            ) : (
                headerID !== 1 && (
                    <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            onClick={() => handlePreviousButton()}
                        >
                            {headerID === 1 ? 'Cancel' : 'Previous'}
                        </Button>
                        <Button
                            variant="solid"
                            disabled={handleDisableNextButton()}
                            loading={isPending}
                            type={
                                headerID === 4 || headerID === 5
                                    ? 'submit'
                                    : 'button'
                            }
                            onClick={handleNextButton}
                        >
                            {headerID === 5 ? 'Submit' : 'Next'}
                        </Button>
                    </div>
                )
            )}
        </Dialog>
    )
}
