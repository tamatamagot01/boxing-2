import { Button, Dialog } from '@/components/ui'
import { FaUser } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'

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
            <div className="px-6 pb-6">
                <h4 className="mb-2">Book a class</h4>
                <h6>Choose the class type</h6>
                <hr className="my-4" />
                <div className="flex flex-col gap-2">
                    <Button icon={<FaUser />} block>
                        Private
                    </Button>
                    <Button variant="solid" icon={<FaUserGroup />} block>
                        Group
                    </Button>
                </div>
            </div>
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
