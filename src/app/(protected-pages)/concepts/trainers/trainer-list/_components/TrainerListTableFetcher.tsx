'use client'

import { useEffect } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import Loading from '@/components/ui/Loading/Loading'

import { useSearchParams } from 'next/navigation'
import { useTrainerListStore } from '../_store/trainerListStore'
import { getTrainers } from '../../service/trainers/queryFns'
import TrainerListTable from './TrainerListTable'

export default function TrainerListTableFetcher() {
    const searchParams = useSearchParams()
    const query = searchParams.get('query') || ''
    const pageIndex = searchParams.get('pageIndex') || '1'
    const pageSize = searchParams.get('pageSize') || '10'

    const setTrainerList = useTrainerListStore((state) => state.setTrainerList)

    const params = { query, pageIndex, pageSize }

    const { data, isPending, error } = useQuery({
        queryKey: ['trainers', params],
        queryFn: () => getTrainers(params),
        placeholderData: keepPreviousData,
    })

    useEffect(() => {
        if (data?.trainers?.trainers) {
            setTrainerList(data.trainers.trainers)
        }
    }, [data, setTrainerList])

    if (isPending) return <Loading />
    if (error) {
        return (
            <p className="text-red-500">
                Error:{' '}
                {(error as any).response?.data?.error ||
                    (error as Error).message}
            </p>
        )
    }

    return (
        <TrainerListTable
            trainerListTotal={data.trainers.count}
            pageIndex={parseInt(pageIndex)}
            pageSize={parseInt(pageSize)}
        />
    )
}
