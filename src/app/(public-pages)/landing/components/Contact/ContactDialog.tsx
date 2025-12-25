import { Dialog } from '@/components/ui'

type ContactDialogProps = {
    isOpen: boolean
    setIsOpenContactDialog: (isOpen: boolean) => void
}

export default function ContactDialog({
    isOpen,
    setIsOpenContactDialog,
}: ContactDialogProps) {
    // logic
    const handleCloseDialog = () => {
        setIsOpenContactDialog(false)
    }

    return (
        <Dialog
            isOpen={isOpen}
            width={500}
            style={{
                content: {
                    marginTop: 150,
                },
            }}
            contentClassName="pb-0 px-0"
            onClose={handleCloseDialog}
        >
            <div className="px-6 pb-6">
                <h4 className="mb-2">Contact Us</h4>
                <hr className="my-4" />

                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Phone:
                        </span>
                        <a
                            href="tel:0806430456"
                            className="text-sm font-semibold text-primary hover:underline"
                        >
                            080 643 0456
                        </a>
                    </div>
                </div>
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Email:
                        </span>
                        <a
                            href="mailto:incomemuaythai@gmail.com"
                            className="text-sm font-semibold text-primary hover:underline"
                        >
                            incomemuaythai@gmail.com
                        </a>
                    </div>
                </div>
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Line:
                        </span>
                        <a
                            href="https://line.me/ti/p/~incomeboxing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-primary hover:underline"
                        >
                            @incomeboxing
                        </a>
                    </div>
                </div>
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Instagram:
                        </span>
                        <a
                            href="https://www.instagram.com/incomemuaythaicnx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-primary hover:underline"
                        >
                            @incomemuaythaicnx
                        </a>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
