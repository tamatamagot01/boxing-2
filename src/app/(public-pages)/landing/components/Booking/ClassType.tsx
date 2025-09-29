import { Button, Select } from '@/components/ui'
import { FaUser } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'
import { useClassTypeStore } from '../../store/clientStore'
import { headerLists } from '../../store/headerStore'
import { useQuery } from '@tanstack/react-query'
import { UserType } from '@/@types/common'
import { getTrainers } from '@/utils/query/trainer/queryFns'

export default function ClassType() {
    const header = headerLists[0]

    const { classType, setClassType, setTrainer } = useClassTypeStore()

    const { isPending, error, data } = useQuery({
        queryKey: ['trainers'],
        queryFn: getTrainers,
    })

    if (isPending) return 'Loading...'

    if (error) {
        return (
            'An error has occurred: ' +
            ((error as any).response?.data?.error || (error as Error).message)
        )
    }

    const handleSelectClassType = (classType: 'private' | 'group') => {
        setClassType(classType)

        if (classType === 'group') {
            setTrainer(0)
        }
    }

    return (
        <>
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

                {classType === 'private' && (
                    <div>
                        <hr className="my-4" />
                        <label className="font-bold">Trainer</label>
                        <Select
                            className="mt-2"
                            placeholder="Select trainer"
                            options={data?.trainers.map(
                                (trainer: UserType) => ({
                                    label: trainer.first_name,
                                    value: trainer.id,
                                }),
                            )}
                            onChange={(
                                option: { label: string; value: number } | null,
                            ) => setTrainer(option?.value ?? 0)}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
