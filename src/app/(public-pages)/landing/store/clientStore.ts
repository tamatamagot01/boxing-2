import { create } from 'zustand'
import { Dayjs } from 'dayjs'

type ClassTypeStore = {
    classType: 'private' | 'group' | null
    setClassType: (selectedClassType: 'private' | 'group' | null) => void

    trainerID: number
    setTrainer: (selectedTrainer: number) => void
}

export const useClassTypeStore = create<ClassTypeStore>()((set) => ({
    classType: null,
    setClassType: (selectedClassType: 'private' | 'group' | null) =>
        set({ classType: selectedClassType }),

    trainerID: 0,
    setTrainer: (selectedTrainer: number) =>
        set({ trainerID: selectedTrainer }),
}))

type ClassDateStore = {
    date: Dayjs | null
    setDate: (selectedDate: Dayjs | null) => void

    timeID: number | null
    setTime: (selectedTime: number | null) => void
}

export const useClassDateStore = create<ClassDateStore>()((set) => ({
    date: null,
    setDate: (selectedDate: Dayjs | null) => set({ date: selectedDate }),

    timeID: null,
    setTime: (selectedTime: number | null) => set({ timeID: selectedTime }),
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
    }),
)
