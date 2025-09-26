import { Button, Dialog } from '@/components/ui'
import ClassType from './ClassType'
import ClassTime from './ClassTime'

type BookingDialogProps = {
    isOpen: boolean
    setIsOpenBookingDialog: (isOpen: boolean) => void
}

export default function BookingDialog({
    isOpen,
    setIsOpenBookingDialog,
}: BookingDialogProps) {
    return (
        <Dialog
            isOpen={isOpen}
            width={375}
            style={{
                content: {
                    marginTop: 250,
                },
            }}
            contentClassName="pb-0 px-0"
            onClose={() => setIsOpenBookingDialog(false)}
        >
            {/* <ClassType /> */}
            <ClassTime />
            <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                <Button
                    className="ltr:mr-2 rtl:ml-2"
                    onClick={() => setIsOpenBookingDialog(false)}
                >
                    Cancel
                </Button>
                <Button
                    variant="solid"
                    onClick={() => setIsOpenBookingDialog(false)}
                >
                    Okay
                </Button>
            </div>
        </Dialog>
    )
}
