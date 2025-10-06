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
    first_name: string
    last_name: string
    email: string
    phone: string
    img?: string
}
