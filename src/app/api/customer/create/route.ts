/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { customAlphabet } from 'nanoid'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { payload } = await req.json()
    const { firstName, lastName, email, phone } = payload

    try {
        const existedCustomer = await prisma.user.findFirst({
            where: {
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
            },
        })

        if (existedCustomer) {
            return NextResponse.json(
                { error: 'This is existed customer' },
                { status: 400 },
            )
        }

        const customer = await prisma.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
            },
        })

        return NextResponse.json({ customer: customer })
    } catch (error: any) {
        console.error('Error creating customer:', error)
        return NextResponse.json(
            { error: 'Failed to create customer' },
            { status: 500 },
        )
    }
}
