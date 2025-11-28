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
            {classType && (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Selected:
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {classType.charAt(0).toUpperCase() +
                                classType.slice(1)}{' '}
                            Class
                        </span>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3">
                <div
                    onClick={() => handleSelectClassType('private')}
                    className={`
                        relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${
                            classType === 'private'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }
                    `}
                >
                    {classType === 'private' && (
                        <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-3">
                        <div
                            className={`
                            text-2xl p-3 rounded-lg
                            ${
                                classType === 'private'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }
                        `}
                        >
                            <FaUser />
                        </div>
                        <div>
                            <h5
                                className={`font-bold ${
                                    classType === 'private'
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                Private Class
                            </h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                One-on-one training session
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => handleSelectClassType('group')}
                    className={`
                        relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${
                            classType === 'group'
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md'
                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }
                    `}
                >
                    {classType === 'group' && (
                        <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-3">
                        <div
                            className={`
                            text-2xl p-3 rounded-lg
                            ${
                                classType === 'group'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }
                        `}
                        >
                            <FaUserGroup />
                        </div>
                        <div>
                            <h5
                                className={`font-bold ${
                                    classType === 'group'
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                Group Class
                            </h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Train with multiple participants
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
