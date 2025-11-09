/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { customAlphabet } from 'nanoid'
import { sendMail } from '@/app/(public-pages)/landing/utils/sendMail'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { payload } = await req.json()
    const {
        first_name,
        last_name,
        email,
        phone,
        classType,
        date,
        timeID,
        participant,
        userID, // Optional - ถ้ามีแปลว่า login แล้ว
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
            // ถ้ามี userID แปลว่า login แล้ว (member booking)
            if (userID) {
                const newBooking = await tx.booking.create({
                    data: {
                        userID,
                        classType,
                        bookingDate: date,
                        bookingTimeID: timeID,
                        participant,
                        bookingID,
                        createdBy: userID,
                    },
                    include: {
                        time: {
                            select: { start: true, end: true },
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

                return {
                    ...newBooking,
                    customerInfo: {
                        first_name: newBooking.user!.first_name,
                        last_name: newBooking.user!.last_name,
                        email: newBooking.user!.email,
                    },
                }
            } else {
                // Guest booking - เก็บข้อมูลใน booking เลย
                const newBooking = await tx.booking.create({
                    data: {
                        guestFirstName: first_name,
                        guestLastName: last_name,
                        guestEmail: email.toLowerCase().trim(),
                        guestPhone: phone.replace(/\D/g, ''),
                        classType,
                        bookingDate: date,
                        bookingTimeID: timeID,
                        participant,
                        bookingID,
                    },
                    include: {
                        time: {
                            select: { start: true, end: true },
                        },
                    },
                })

                return {
                    ...newBooking,
                    customerInfo: {
                        first_name: newBooking.guestFirstName!,
                        last_name: newBooking.guestLastName!,
                        email: newBooking.guestEmail!,
                    },
                }
            }
        })

        // ส่ง Email ให้ลูกค้าและเจ้าของค่ายหลังจากสร้าง booking สำเร็จ
        try {
            const bookingDetails = {
                bookingID: result.bookingID,
                customer: result.customerInfo,
                classType: result.classType,
                date: result.bookingDate,
                time: {
                    start: result.time.start,
                    end: result.time.end,
                },
                participant: result.participant,
            }

            await sendMail(bookingDetails)

            const ownerEmail = process.env.OWNER_EMAIL
            if (ownerEmail) {
                await sendMail({
                    ...bookingDetails,
                    customer: {
                        ...bookingDetails.customer,
                        email: ownerEmail,
                    },
                })
            }
        } catch (emailError) {
            console.error('Error sending email notification:', emailError)
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
