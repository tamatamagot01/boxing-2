/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    const bookingDate = searchParams.get('bookingDate') ?? ''
    const bookingTimeID = searchParams.get('bookingTimeID') ?? 0

    try {
        const bookings = await prisma.booking.findMany({
            where: { bookingDate, bookingTimeID: Number(bookingTimeID) },
        })

        return NextResponse.json({ bookings })
    } catch (error: any) {
        console.error('Error fetching data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 },
        )
    }
}
