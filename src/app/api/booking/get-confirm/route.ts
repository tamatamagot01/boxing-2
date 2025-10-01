/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const trainerID = Number(searchParams.get('trainerID')) ?? 0
    const bookingTimeID = Number(searchParams.get('bookingTimeID')) ?? 0

    try {
        const result = await prisma.$transaction(async (tx) => {
            const trainer = await tx.user.findUnique({
                where: {
                    id: trainerID,
                },
                select: {
                    first_name: true,
                    last_name: true,
                },
            })

            const time = await tx.timeList.findUnique({
                where: {
                    id: bookingTimeID,
                },
                select: {
                    time: true,
                },
            })

            return { trainer, time }
        })

        return NextResponse.json(result)
    } catch (error: any) {
        console.error('Error fetching data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 },
        )
    }
}
