import { create } from 'zustand'

type ClassTypeStore = {
    classType: 'private' | 'group' | null
    setClassType: (selectedClassType: 'private' | 'group' | null) => void
    clearClassType: () => void

    trainerID: number
    setTrainer: (selectedTrainer: number) => void
    clearTrainer: () => void
}

export const useClassTypeStore = create<ClassTypeStore>()((set) => ({
    classType: null,
    setClassType: (selectedClassType: 'private' | 'group' | null) =>
        set({ classType: selectedClassType }),
    clearClassType: () => set({ classType: null }),

    trainerID: 0,
    setTrainer: (selectedTrainer: number) =>
        set({ trainerID: selectedTrainer }),
    clearTrainer: () => set({ trainerID: 0 }),
}))

type ClassDateStore = {
    date: string | null
    setDate: (selectedDate: string | null) => void
    clearDate: () => void

    timeID: number | null
    setTime: (selectedTime: number | null) => void
    clearTime: () => void
}

export const useClassDateStore = create<ClassDateStore>()((set) => ({
    date: null,
    setDate: (selectedDate: string | null) => set({ date: selectedDate }),
    clearDate: () => set({ date: null }),

    timeID: null,
    setTime: (selectedTime: number | null) => set({ timeID: selectedTime }),
    clearTime: () => set({ timeID: null }),
}))

type ClassParticipantStore = {
    maxGroupParticipant: number
    maxPrivateParticipant: number
    participant: number
    setParticipant: (selectedParticipant: number) => void

    clearParticipant: () => void
}

export const useClassParticipantStore = create<ClassParticipantStore>()(
    (set) => ({
        maxGroupParticipant: 28,
        maxPrivateParticipant: 2,
        participant: 1,

        setParticipant: (selectedParticipant: number) =>
            set({ participant: selectedParticipant }),

        clearParticipant: () => set({ participant: 0 }),
    }),
)
