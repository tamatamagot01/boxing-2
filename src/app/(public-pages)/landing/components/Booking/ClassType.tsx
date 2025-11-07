import { Button } from '@/components/ui'
import { FaUser } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'
import { useClassTypeStore } from '../../store/clientStore'
import { headerLists } from '../../store/headerStore'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/ui/Loading/Loading'
import { getTrainers } from '../../service/trainer/queryFns'

type TrainerOption = {
    label: string
    value: number
}

export default function ClassType() {
    const header = headerLists[0]

    const { setClassType } = useClassTypeStore()

    const { isPending, error } = useQuery({
        queryKey: ['trainers'],
        queryFn: getTrainers,
    })

    if (isPending) return <Loading />

    if (error) {
        return (
            'An error has occurred: ' +
            ((error as any).response?.data?.error || (error as Error).message)
        )
    }

    const handleSelectClassType = (classType: 'private' | 'group') => {
        setClassType(classType)
    }

    return (
        <div className="px-6 pb-6">
            <h4 className="mb-2">Book a class</h4>
            <h6>{header.name}</h6>
            <hr className="my-4" />
            <div className="flex flex-col gap-2">
                <Button
                    icon={<FaUser />}
                    onClick={() => handleSelectClassType('private')}
                    block
                >
                    Private
                </Button>
                <Button
                    variant="solid"
                    icon={<FaUserGroup />}
                    onClick={() => handleSelectClassType('group')}
                    block
                >
                    Group
                </Button>
            </div>
        </div>
    )
}
