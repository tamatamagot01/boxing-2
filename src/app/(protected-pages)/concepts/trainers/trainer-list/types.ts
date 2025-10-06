export type GetTrainersListResponse = {
    list: Trainer[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Trainer = {
    id: string
    first_name: string
    last_name: string
    email: string
    phone: string
    img?: string
}
