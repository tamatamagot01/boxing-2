/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const bookingTimeID = Number(searchParams.get('bookingTimeID')) ?? 0

    try {
        const result = await prisma.$transaction(async (tx) => {
            const time = await tx.timeList.findUnique({
                where: {
                    id: bookingTimeID,
                },
                select: {
                    start: true,
                    end: true,
                },
            })

            return { time }
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
