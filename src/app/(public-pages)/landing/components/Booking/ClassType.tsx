import { Button } from '@/components/ui'
import { FaUser } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'
import { useClassTypeStore } from '../../store/clientStore'
import { headerLists } from '../../store/headerStore'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/ui/Loading/Loading'
import { getTrainers } from '../../service/trainer/queryFns'
import { useEffect } from 'react'

type ClassTypeProps = {
    onLoadingChange?: (isLoading: boolean) => void
}

export default function ClassType({ onLoadingChange }: ClassTypeProps) {
    const header = headerLists[0]

    const { classType, setClassType } = useClassTypeStore()

    const { isPending, error } = useQuery({
        queryKey: ['trainers'],
        queryFn: getTrainers,
    })

    // Notify parent about loading state
    useEffect(() => {
        onLoadingChange?.(isPending)
    }, [isPending, onLoadingChange])

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

            {/* Booking Summary Card */}
            <div className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Booking Summary
                </h6>
                <div className="space-y-2">
                    {classType && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                Class Type
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs font-semibold">
                                {classType.charAt(0).toUpperCase() +
                                    classType.slice(1)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

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
