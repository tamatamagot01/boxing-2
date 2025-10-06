/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    const query = searchParams.get('query') || ''
    const pageIndex = parseInt(searchParams.get('pageIndex') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    const searchCondition = query
        ? {
              OR: [
                  {
                      bookingID: {
                          contains: query,
                          mode: 'insensitive' as const,
                      },
                  },
              ],
          }
        : {}

    const skip = (pageIndex - 1) * pageSize
    const take = pageSize

    try {
        const result = await prisma.$transaction(async (tx) => {
            const bookings = await tx.booking.findMany({
                where: searchCondition,
                skip: skip,
                take: take,
                orderBy: {
                    id: 'desc',
                },
                include: { time: true },
            })

            const count = await tx.booking.count({
                where: searchCondition,
            })

            return { bookings, count }
        })

        return NextResponse.json({ bookings: result })
    } catch (error: any) {
        console.error('Error fetching data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 },
        )
    }
}
