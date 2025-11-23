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
                select: {
                    bookingID: true,
                    bookingDate: true,
                    time: true,
                    guestFirstName: true,
                    guestLastName: true,
                    guestEmail: true,
                    guestPhone: true,
                    user: {
                        select: {
                            first_name: true,
                            last_name: true,
                            email: true,
                            phone: true,
                        },
                    },
                },
            })

            const count = await tx.booking.count({
                where: searchCondition,
            })

            return { bookings, count }
        })

        const calendarData = result.bookings.map((booking) => ({
            id: booking.bookingID,
            title:
                'Booking ' +
                booking.bookingID +
                ' - ' +
                (booking.user?.first_name ?? booking.guestFirstName) +
                ' ' +
                (booking.user?.last_name ?? booking.guestLastName),
            start: `${booking.bookingDate}T${booking.time.start}`,
            end: `${booking.bookingDate}T${booking.time.end}`,
            eventColor: 'red',
        }))

        return NextResponse.json({ bookings: calendarData })
    } catch (error: any) {
        console.error('Error fetching data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 },
        )
    }
}
