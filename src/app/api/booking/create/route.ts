/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { customAlphabet } from 'nanoid'
import LineNotifyService from '@/services/LineNotifyService'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { payload } = await req.json()
    const {
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

    const generateBookingID = customAlphabet(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        6,
    )

    let bookingID = generateBookingID()

    let isExistedBooking = await prisma.booking.findUnique({
        where: { bookingID },
    })

    while (isExistedBooking) {
        bookingID = generateBookingID()
        isExistedBooking = await prisma.booking.findUnique({
            where: { bookingID },
        })
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            const existedCustomer = await tx.user.findFirst({
                where: {
                    first_name,
                    last_name,
                    email,
                    phone,
                },
            })

            let customer = existedCustomer

            if (!existedCustomer) {
                customer = await tx.user.create({
                    data: {
                        first_name,
                        last_name,
                        email,
                        phone,
                    },
                })
            }

            const newBooking = await tx.booking.create({
                data: {
                    userID: customer!.id,
                    classType,
                    trainerID: classType === 'group' ? null : trainerID,
                    bookingDate: date,
                    bookingTimeID: timeID,
                    participant,
                    bookingID,
                    createdBy: customer!.id,
                },
                include: {
                    time: {
                        select: { time: true },
                    },
                    trainer: {
                        select: { first_name: true, last_name: true },
                    },
                    user: {
                        select: {
                            first_name: true,
                            last_name: true,
                            email: true,
                        },
                    },
                },
            })

            return newBooking
        })

        // ส่ง LINE Notification หลังจากสร้าง booking สำเร็จ
        try {
            await LineNotifyService.sendBookingNotification({
                bookingID: result.bookingID,
                customerName: `${result.user.first_name} ${result.user.last_name}`,
                email: result.user.email || '-',
                phone: phone || '-',
                classType: result.classType,
                trainerName: result.trainer
                    ? `${result.trainer.first_name} ${result.trainer.last_name}`
                    : undefined,
                bookingDate: new Date(result.bookingDate).toLocaleDateString(
                    'th-TH',
                    {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    },
                ),
                bookingTime: result.time.time,
                participant: result.participant,
            })
        } catch (notifyError) {
            // ถ้าส่ง LINE Notification ไม่สำเร็จ ให้ log error แต่ไม่ให้ fail ทั้งหมด
            console.error('Error sending LINE notification:', notifyError)
        }

        return NextResponse.json({ booking: result })
    } catch (error: any) {
        console.error('Error creating booking:', error)
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 },
        )
    }
}
