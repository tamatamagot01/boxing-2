'use client'

import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import { useUserListStore } from '../_store/userListStore'
import dynamic from 'next/dynamic'

const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), {
    ssr: false,
})

const UserListActionTools = () => {
    const router = useRouter()

    const userList = useUserListStore((state) => state.userList)

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => router.push('/concepts/users/user-create')}
            >
                Add new
            </Button>
        </div>
    )
}

export default UserListActionTools
