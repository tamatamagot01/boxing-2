import { Button, Select } from '@/components/ui'
import { FaUser } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'
import { useClassTypeStore } from '../../store/clientStore'
import { headerLists } from '../../store/headerStore'

export default function ClassType() {
    const header = headerLists[0]

    const { classType, setClassType, setTrainer } = useClassTypeStore()

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
                    <Select
                        className="mt-6"
                        placeholder="Select trainer"
                        options={[
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                        ]}
                        onChange={(e) => setTrainer(e?.value || 0)}
                    />
                )}
            </div>
        </>
    )
}
