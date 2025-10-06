'use client'

import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import { useTrainerListStore } from '../_store/trainerListStore'
import dynamic from 'next/dynamic'

const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), {
    ssr: false,
})

const TrainerListActionTools = () => {
    const router = useRouter()

    const trainerList = useTrainerListStore((state) => state.trainerList)

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="trainerList.csv"
                data={trainerList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => router.push('/concepts/trainers/trainer-create')}
            >
                Add new
            </Button>
        </div>
    )
}

export default TrainerListActionTools
