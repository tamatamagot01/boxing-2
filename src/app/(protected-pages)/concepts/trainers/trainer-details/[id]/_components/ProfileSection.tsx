'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar/Avatar'
import Notification from '@/components/ui/Notification'
import Tooltip from '@/components/ui/Tooltip'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { HiPencil, HiOutlineTrash } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { TrainerDetailsProps } from './TrainerDetails'
import { capitalizeString } from '@/utils/capitalizeString'
import profileImage from '@/../public/img/avatars/thumb-1.jpg'

type TrainerInfoFieldProps = {
    title?: string
    value?: string
}

const TrainerInfoField = ({ title, value }: TrainerInfoFieldProps) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            <p className="heading-text font-bold">{value}</p>
        </div>
    )
}

const ProfileSection = ({ data }: TrainerDetailsProps) => {
    const router = useRouter()

    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const handleDelete = () => {
        setDialogOpen(false)
        router.push('/concepts/trainers/trainer-list')
        toast.push(
            <Notification title={'Successfully Deleted'} type="success">
                Trainer successfuly deleted
            </Notification>,
        )
    }

    const handleEdit = () => {
        router.push(`/concepts/trainers/trainer-edit/${data.id}`)
    }

    return (
        <Card className="w-full">
            <div className="flex justify-end">
                <Tooltip title="Edit trainer">
                    <button
                        className="close-button button-press-feedback"
                        type="button"
                        onClick={handleEdit}
                    >
                        <HiPencil />
                    </button>
                </Tooltip>
            </div>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    <Avatar
                        size={90}
                        shape="circle"
                        src={data.img || profileImage.src}
                    />
                    <h4 className="font-bold">
                        {capitalizeString(data.first_name)}{' '}
                        {capitalizeString(data.last_name)}
                    </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-10">
                    <TrainerInfoField title="Email" value={data.email} />
                    <TrainerInfoField title="Phone" value={data.phone} />
                </div>
                <div className="flex flex-col gap-4 mt-7">
                    <Button
                        block
                        customColorClass={() =>
                            'text-error hover:border-error hover:ring-1 ring-error hover:text-error'
                        }
                        icon={<HiOutlineTrash />}
                        onClick={handleDialogOpen}
                    >
                        Delete
                    </Button>
                </div>
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title="Delete trainer"
                    onClose={handleDialogClose}
                    onRequestClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    onConfirm={handleDelete}
                >
                    <p>
                        Are you sure you want to delete this trainer? All record
                        related to this trainer will be deleted as well. This
                        action cannot be undone.
                    </p>
                </ConfirmDialog>
            </div>
        </Card>
    )
}

export default ProfileSection
