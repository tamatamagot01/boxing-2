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
            // Normalize ข้อมูล
            const normalizedEmail = email.toLowerCase().trim()
            const normalizedPhone = phone.replace(/\D/g, '') // เอาเฉพาะตัวเลข

            // ค้นหา customer ด้วย email (unique identifier)
            const existedCustomer = await tx.user.findUnique({
                where: {
                    email: normalizedEmail,
                },
            })

            let customer = existedCustomer

            if (!existedCustomer) {
                // สร้าง user ใหม่ถ้ายังไม่มี
                customer = await tx.user.create({
                    data: {
                        first_name,
                        last_name,
                        email: normalizedEmail,
                        phone: normalizedPhone,
                    },
                })
            } else {
                // อัปเดตข้อมูล user ถ้ามีการเปลี่ยนแปลง
                customer = await tx.user.update({
                    where: {
                        email: normalizedEmail,
                    },
                    data: {
                        first_name,
                        last_name,
                        phone: normalizedPhone,
                    },
                })
            }

            const newBooking = await tx.booking.create({
                data: {
                    userID: customer!.id,
                    classType,
                    bookingDate: date,
                    bookingTimeID: timeID,
                    participant,
                    bookingID,
                    createdBy: customer!.id,
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

            return newBooking
        })

        // ส่ง Email ให้ลูกค้าและเจ้าของค่ายหลังจากสร้าง booking สำเร็จ
        try {
            const bookingDetails = {
                bookingID: result.bookingID,
                customer: {
                    first_name: result.user.first_name,
                    last_name: result.user.last_name,
                    email: result.user.email,
                },
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
