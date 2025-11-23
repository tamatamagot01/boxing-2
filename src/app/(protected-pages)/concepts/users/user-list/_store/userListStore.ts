import { create } from 'zustand'
import type { User, Filter } from '../types'

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

export type UsersListState = {
    initialLoading: boolean
    userList: User[]
    filterData: Filter
    selectedUser: Partial<User>[]
}

type UsersListAction = {
    setUserList: (userList: User[]) => void
    setFilterData: (payload: Filter) => void
    setSelectedUser: (checked: boolean, user: User) => void
    setSelectAllUser: (user: User[]) => void
    setInitialLoading: (payload: boolean) => void
}

const initialState: UsersListState = {
    initialLoading: true,
    userList: [],
    filterData: initialFilterData,
    selectedUser: [],
}

export const useUserListStore = create<UsersListState & UsersListAction>(
    (set) => ({
        ...initialState,
        setFilterData: (payload) => set(() => ({ filterData: payload })),
        setSelectedUser: (checked, row) =>
            set((state) => {
                const prevData = state.selectedUser
                if (checked) {
                    return { selectedUser: [...prevData, ...[row]] }
                } else {
                    if (prevData.some((prevUser) => row.id === prevUser.id)) {
                        return {
                            selectedUser: prevData.filter(
                                (prevUser) => prevUser.id !== row.id,
                            ),
                        }
                    }
                    return { selectedUser: prevData }
                }
            }),
        setSelectAllUser: (row) => set(() => ({ selectedUser: row })),
        setUserList: (userList) => set(() => ({ userList })),
        setInitialLoading: (payload) =>
            set(() => ({ initialLoading: payload })),
    }),
)
