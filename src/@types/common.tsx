import type { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
    id?: string
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type TableQueries = {
    total?: number
    pageIndex?: string
    pageSize?: string
    query?: string
    order?: 'asc' | 'desc' | ''
    sortKey?: string | number
}

export type PageProps = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export type UserType = {
    id: number
    email: string
    phone: string
    first_name: string
    last_name: string
    password?: string
    is_backOffice: boolean
    is_trainer: boolean
    resetPassword: boolean
}

export type TimeListType = {
    id: number
    time: string
    classType: 'private' | 'group'
}

export type BookingType = {
    classType: 'private' | 'group'
    trainerID: number
    date: string
    timeID: number
    first_name: string
    last_name: string
    email: string
    phone: string
}
