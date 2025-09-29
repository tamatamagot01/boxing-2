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
    participant: number
    setParticipant: (selectedParticipant: number) => void
    incParticipant: () => void
    decParticipant: () => void

    maxParticipants: number
    setMaxParticipants: (classType: 'private' | 'group') => void

    availableSpot: number
    setAvailableSpot: (available: number) => void

    clearParticipant: () => void
}

export const useClassParticipantStore = create<ClassParticipantStore>()(
    (set) => ({
        participant: 1,

        setParticipant: (selectedParticipant: number) =>
            set({ participant: selectedParticipant }),

        incParticipant: () =>
            set((state) => ({
                participant: Math.min(
                    state.participant + 1,
                    state.maxParticipants,
                ),
            })),

        decParticipant: () =>
            set((state) => ({
                participant: Math.max(state.participant - 1, 1),
            })),

        maxParticipants: 2,

        setMaxParticipants: (classType) =>
            set({
                maxParticipants: classType === 'private' ? 2 : 28,
                participant: 1, // reset ค่า participant ตอนเปลี่ยน classType
            }),

        availableSpot: 1,
        setAvailableSpot: (available: number) =>
            set({ availableSpot: available }),

        clearParticipant: () => set({ participant: 0 }),
    }),
)
