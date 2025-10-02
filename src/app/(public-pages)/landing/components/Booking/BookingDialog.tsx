import { Button, Dialog } from '@/components/ui'
import ClassType from './ClassType'
import ClassTime from './ClassTime'
import ClassUserDetail from './ClassUserDetail'
import { useHeaderStore } from '../../store/headerStore'
import {
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
import { sendMail } from '../../utils/sendMail'
import { createBooking } from '../../service/booking/queryFns'

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
    // headerStore
    const { headerID, resetHeaderID, incHeaderID, decHeaderID } =
        useHeaderStore()

    // bookingStore
    const { classType, trainerID, clearClassType, clearTrainer } =
        useClassTypeStore()
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
        clearClassType()
        clearTrainer()
        clearDate()
        clearTime()
        clearParticipant()
        reset()
    }

    const handlePreviousButton = () => {
        if (headerID === 1) {
            setIsOpenBookingDialog(false)
            resetHeaderID()
            clearClassType()
            clearTrainer()
        }

        if (headerID === 2) {
            decHeaderID()
            clearDate()
            clearTime()
            clearParticipant()
        }

        if (headerID === 3 || headerID === 4) {
            decHeaderID()
        }
    }

    const handleDisableNextButton = () => {
        if (headerID === 1) {
            if (!classType || (classType === 'private' && !trainerID)) {
                return true
            }
        }

        if (headerID === 2) {
            if (!date || !timeID || !participant) {
                return true
            }

            if (currentAvailable - participant < 0) {
                return true
            }
        }

        if (headerID === 3) {
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

    const { mutate, isPending, error, isSuccess, data } = useMutation({
        mutationFn: (userData: UserDetailInputType) => {
            const payload = {
                ...userData,
                classType: classType!,
                trainerID,
                date: date!,
                timeID: timeID!,
                participant,
            }
            return createBooking(payload)
        },
        onSuccess: (data) => {
            const bookingDetails = {
                bookingID: data.booking.bookingID,
                customer: {
                    first_name: data.booking.user.first_name,
                    last_name: data.booking.user.last_name,
                    email: data.booking.user.email,
                },
                trainer: data.booking.trainer
                    ? {
                          first_name: data.booking.trainer.first_name,
                          last_name: data.booking.trainer.last_name,
                      }
                    : null,
                classType: data.booking.classType,
                date: data.booking.bookingDate,
                time: data.booking.time.time,
                participant: data.booking.participant,
            }

            sendMail(bookingDetails)
            clearClassType()
            clearTrainer()
            clearDate()
            clearTime()
            clearParticipant()
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
        mutate(userData)
    }

    return (
        <Dialog
            isOpen={isOpen}
            width={headerID === 3 || headerID === 4 ? 500 : 375}
            style={{
                content: {
                    marginTop: headerID === 1 ? 150 : 100,
                },
            }}
            contentClassName="pb-0 px-0"
            onClose={handleCloseDialog}
        >
            {headerID === 1 && <ClassType />}
            {headerID === 2 && <ClassTime />}
            {headerID === 3 && (
                <ClassUserDetail register={register} errors={errors} />
            )}
            {headerID === 4 && !isSuccess && (
                <BookingConfirmation getUserData={getValues} />
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
                            headerID === 3 || headerID === 4
                                ? 'submit'
                                : 'button'
                        }
                        onClick={
                            headerID === 4
                                ? handleSubmit(onSubmit)
                                : incHeaderID
                        }
                    >
                        {headerID === 4 ? 'Submit' : 'Next'}
                    </Button>
                </div>
            )}
        </Dialog>
    )
}
