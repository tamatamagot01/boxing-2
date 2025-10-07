export type GetBookingsListResponse = {
    list: Booking[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Booking = {
    id: string
    bookingID: string
    bookingDate: string
    time: { time: string }
    participant: number
    classType: string
}
