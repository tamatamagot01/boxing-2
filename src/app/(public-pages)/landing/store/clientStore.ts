import { create } from 'zustand'

type UserTypeStore = {
    userType: 'member' | 'register' | 'guest' | null
    setUserType: (
        selectedUserType: 'member' | 'register' | 'guest' | null,
    ) => void
    clearUserType: () => void
}

export const useUserTypeStore = create<UserTypeStore>()((set) => ({
    userType: null,
    setUserType: (selectedUserType: 'member' | 'register' | 'guest' | null) =>
        set({ userType: selectedUserType }),
    clearUserType: () => set({ userType: null }),
}))

type ClassTypeStore = {
    classType: 'private' | 'group' | null
    setClassType: (selectedClassType: 'private' | 'group' | null) => void
    clearClassType: () => void
}

export const useClassTypeStore = create<ClassTypeStore>()((set) => ({
    classType: null,
    setClassType: (selectedClassType: 'private' | 'group' | null) =>
        set({ classType: selectedClassType }),
    clearClassType: () => set({ classType: null }),
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

    currentAvailable: number
    setCurrentAvailable: (available: number) => void

    clearParticipant: () => void
}

export const useClassParticipantStore = create<ClassParticipantStore>()(
    (set) => ({
        maxGroupParticipant: 6,
        maxPrivateParticipant: 2,

        participant: 1,
        setParticipant: (selectedParticipant: number) =>
            set({ participant: selectedParticipant }),

        currentAvailable: 0,
        setCurrentAvailable: (available: number) =>
            set({ currentAvailable: available }),

        clearParticipant: () => set({ participant: 1 }),
    }),
)
