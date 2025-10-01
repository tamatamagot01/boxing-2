import { create } from 'zustand'

export const headerLists = [
    { id: 1, name: 'Choose the class type' },
    { id: 2, name: 'Select time and number of participants' },
    { id: 3, name: 'Fill your details' },
    { id: 4, name: 'Confirm your booking details' },
]

type HeaderStore = {
    headerID: number
    incHeaderID: () => void
    decHeaderID: () => void
}

export const useHeaderStore = create<HeaderStore>()((set) => ({
    headerID: 1,
    incHeaderID: () => set((state) => ({ headerID: state.headerID + 1 })),
    decHeaderID: () => set((state) => ({ headerID: state.headerID - 1 })),
}))
