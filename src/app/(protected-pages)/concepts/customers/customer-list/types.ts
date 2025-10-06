export type GetCustomersListResponse = {
    list: Customer[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Customer = {
    id: string
    first_name: string
    last_name: string
    email: string
    phone: string
    img?: string
}
