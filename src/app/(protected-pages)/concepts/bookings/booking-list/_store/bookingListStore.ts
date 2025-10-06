import { create } from 'zustand'
import type { Booking, Filter } from '../types'

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

export type BookingsListState = {
    initialLoading: boolean
    bookingList: Booking[]
    filterData: Filter
    selectedBooking: Partial<Booking>[]
}

type BookingsListAction = {
    setBookingList: (bookingList: Booking[]) => void
    setFilterData: (payload: Filter) => void
    setSelectedBooking: (checked: boolean, booking: Booking) => void
    setSelectAllBooking: (booking: Booking[]) => void
    setInitialLoading: (payload: boolean) => void
}

const initialState: BookingsListState = {
    initialLoading: true,
    bookingList: [],
    filterData: initialFilterData,
    selectedBooking: [],
}

export const useBookingListStore = create<
    BookingsListState & BookingsListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setSelectedBooking: (checked, row) =>
        set((state) => {
            const prevData = state.selectedBooking
            if (checked) {
                return { selectedBooking: [...prevData, ...[row]] }
            } else {
                if (prevData.some((prevBooking) => row.id === prevBooking.id)) {
                    return {
                        selectedBooking: prevData.filter(
                            (prevBooking) => prevBooking.id !== row.id,
                        ),
                    }
                }
                return { selectedBooking: prevData }
            }
        }),
    setSelectAllBooking: (row) => set(() => ({ selectedBooking: row })),
    setBookingList: (bookingList) => set(() => ({ bookingList })),
    setInitialLoading: (payload) => set(() => ({ initialLoading: payload })),
}))
