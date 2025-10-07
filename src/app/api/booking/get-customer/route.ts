/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const classType = searchParams.get('classType') ?? ''
    const trainerID = searchParams.get('trainerID') ?? ''
    const bookingDate = searchParams.get('bookingDate') ?? ''
    const bookingTimeID = searchParams.get('bookingTimeID') ?? 0

    console.log(classType, trainerID, bookingDate, bookingTimeID)
    try {
        const bookings = await prisma.booking.aggregate({
            where: {
                classType,
                trainerID: classType === 'private' ? Number(trainerID) : null,
                bookingDate,
                bookingTimeID: Number(bookingTimeID),
            },
            _sum: {
                participant: true,
            },
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
