import { create } from 'zustand'
import type { Trainer, Filter } from '../types'

export const initialFilterData = {
    purchasedProducts: '',
    purchaseChannel: [
        'Retail Stores',
        'Online Retailers',
        'Resellers',
        'Mobile Apps',
        'Direct Sales',
    ],
}

export type TrainersListState = {
    initialLoading: boolean
    trainerList: Trainer[]
    filterData: Filter
    selectedTrainer: Partial<Trainer>[]
}

type TrainersListAction = {
    setTrainerList: (trainerList: Trainer[]) => void
    setFilterData: (payload: Filter) => void
    setSelectedTrainer: (checked: boolean, trainer: Trainer) => void
    setSelectAllTrainer: (trainer: Trainer[]) => void
    setInitialLoading: (payload: boolean) => void
}

const initialState: TrainersListState = {
    initialLoading: true,
    trainerList: [],
    filterData: initialFilterData,
    selectedTrainer: [],
}

export const useTrainerListStore = create<
    TrainersListState & TrainersListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setSelectedTrainer: (checked, row) =>
        set((state) => {
            const prevData = state.selectedTrainer
            if (checked) {
                return { selectedTrainer: [...prevData, ...[row]] }
            } else {
                if (prevData.some((prevTrainer) => row.id === prevTrainer.id)) {
                    return {
                        selectedTrainer: prevData.filter(
                            (prevTrainer) => prevTrainer.id !== row.id,
                        ),
                    }
                }
                return { selectedTrainer: prevData }
            }
        }),
    setSelectAllTrainer: (row) => set(() => ({ selectedTrainer: row })),
    setTrainerList: (trainerList) => set(() => ({ trainerList })),
    setInitialLoading: (payload) => set(() => ({ initialLoading: payload })),
}))
