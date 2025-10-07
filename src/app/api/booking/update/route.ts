/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { customAlphabet } from 'nanoid'

const prisma = new PrismaClient()

export async function PUT(req: Request) {
    const { payload } = await req.json()
    const {
        bookingID,
        userID,
        first_name,
        last_name,
        email,
        phone,
        classType,
        trainerID,
        date,
        timeID,
        participant,
    } = payload

    const isExistedCustomer = await prisma.user.findUnique({
        where: { id: userID },
    })

    if (!isExistedCustomer) {
        return NextResponse.json({ error: 'No customer data' }, { status: 404 })
    }

    const isExistedBooking = await prisma.booking.findUnique({
        where: { id: bookingID },
    })

    if (!isExistedBooking) {
        return NextResponse.json({ error: 'No booking data' }, { status: 404 })
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            const newCustomer = await tx.user.update({
                where: {
                    id: isExistedCustomer.id,
                },
                data: {
                    first_name,
                    last_name,
                    email,
                    phone,
                },
            })

            const newBooking = await tx.booking.update({
                where: {
                    id: isExistedBooking.id,
                },
                data: {
                    classType,
                    trainerID: classType === 'group' ? null : trainerID,
                    bookingDate: date,
                    bookingTimeID: timeID,
                    participant,
                },
            })

            return { newCustomer, newBooking }
        })

        return NextResponse.json({ booking: result })
    } catch (error: any) {
        console.error('Error creating booking:', error)
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 },
        )
    }
}
