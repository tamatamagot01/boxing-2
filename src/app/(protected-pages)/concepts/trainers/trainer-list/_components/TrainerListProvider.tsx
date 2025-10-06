'use client'

import { useEffect } from 'react'
import { useTrainerListStore } from '../_store/trainerListStore'
import type { CommonProps } from '@/@types/common'

const TrainerListProvider = ({ children }: CommonProps) => {
    const setInitialLoading = useTrainerListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setInitialLoading(false)
    }, [setInitialLoading])

    return <>{children}</>
}

export default TrainerListProvider
