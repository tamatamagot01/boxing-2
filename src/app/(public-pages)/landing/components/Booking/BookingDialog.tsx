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

type BookingDialogProps = {
    isOpen: boolean
    setIsOpenBookingDialog: (isOpen: boolean) => void
}

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
    const { participant, clearParticipant } = useClassParticipantStore()

    // logic
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
        }
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
            onClose={() => setIsOpenBookingDialog(false)}
        >
            {headerID === 1 && <ClassType />}
            {headerID === 2 && <ClassTime />}
            {headerID === 3 && <ClassUserDetail />}

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
                    onClick={() => {
                        if (headerID === 3) {
                            console.log('Submit')
                        } else {
                            incHeaderID()
                        }
                    }}
                >
                    {headerID === 3 ? 'Submit' : 'Next'}
                </Button>
            </div>
        </Dialog>
    )
}
