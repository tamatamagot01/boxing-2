/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    const bookingID = Number(searchParams.get('bookingID') ?? '')

    try {
        const booking = await prisma.booking.findUnique({
            where: { id: bookingID },
            include: {
                time: true,
                user: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone: true,
                        img: true,
                    },
                },
                trainer: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        img: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        })

        return NextResponse.json({ booking })
    } catch (error: any) {
        console.error('Error fetching data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 },
        )
    }
}
