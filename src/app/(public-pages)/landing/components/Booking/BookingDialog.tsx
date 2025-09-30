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
    const { headerID, incHeaderID, decHeaderID } = useHeaderStore()

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
    } = useForm<UserDetailInputType>({
        resolver: zodResolver(userDetailSchema),
        mode: 'onSubmit',
        defaultValues: { first_name: '', last_name: '', email: '', phone: '' },
    })

    // logic
    const handleCloseDialog = () => {
        setIsOpenBookingDialog(false)
        clearClassType()
        clearTrainer()
        clearDate()
        clearTime()
        clearParticipant()
    }

    const handlePreviousButton = () => {
        if (headerID === 1) {
            setIsOpenBookingDialog(false)
            clearClassType()
            clearTrainer()
        }

        if (headerID === 2) {
            decHeaderID()
            clearDate()
            clearTime()
            clearParticipant()
        }

        if (headerID === 3) {
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
    }

    const onSubmit = (userData: UserDetailInputType) => {
        console.log(9999, userData)
        console.log(8888, classType, trainerID, date, timeID, participant)
    }

    return (
        <Dialog
            isOpen={isOpen}
            width={headerID === 3 ? 500 : 375}
            style={{
                content: {
                    marginTop: headerID === 1 ? 200 : 0,
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
                    type={headerID === 3 ? 'submit' : 'button'}
                    onClick={
                        headerID === 3 ? handleSubmit(onSubmit) : incHeaderID
                    }
                >
                    {headerID === 3 ? 'Submit' : 'Next'}
                </Button>
            </div>
        </Dialog>
    )
}
