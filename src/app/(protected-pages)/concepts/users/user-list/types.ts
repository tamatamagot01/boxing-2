export type GetUsersListResponse = {
    list: User[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type User = {
    id: string
    first_name: string
    last_name: string
    is_backOffice?: boolean
    is_trainer?: boolean
    email: string
    phone: string
    img?: string
}
